import CertificateStore from './certificateStore';
import { Db } from 'mongodb';
const {generateCertificate, parseCertificate} = require('../certificateBuilder/builder');
import Moment from 'moment';

const fs = require('fs');

const CertificateService = {
    createCertificateAsync: async (certObject, parentId) => {
        certObject.validFrom = Moment.unix(certObject.validFrom).toDate();
        certObject.validTo = Moment.unix(certObject.validTo).toDate();
        certObject.serialNumber = await CertificateStore.fetchCountAsync() + 1;

        if(parentId != null && parentId != undefined){
            let parentObject = await CertificateStore.fetchAsync(parentId);

            if(parentObject == undefined){
                return {status: 404 };
            }
            console.log("Generating Cert...");
            let resultBuffer = await generateCertificate(certObject, parentObject.certificate, parentObject.privateKey, 'keystorepassword'); //[certificate, privateKey]
            console.log("Storing...");
            let storeResult = await CertificateStore.storeAsync(resultBuffer, parentId);

            if(storeResult.status == 200){
                console.log("Completed. InsertedID: " + storeResult.insertedId);
            }

            return {status: storeResult.status, response: { "insertedID": storeResult.insertedId }};
        }
        else
        {
            console.log("Generating Cert...");
            let resultBuffer = await generateCertificate(certObject, null, null, 'keystorepassword');
            console.log("Storing...");
            let storeResult = await CertificateStore.storeAsync(resultBuffer);

            if(storeResult.status == 200){
                console.log("Completed. InsertedID: " + storeResult.insertedId);
            }

            return {status: storeResult.status, response: { "insertedID": storeResult.insertedId }};
        }
    },
    fetchCertificateAsync: async (id) => {
        let result = await CertificateStore.fetchAsync(id);
        return {
            status: result.errorStatus ? result.errorStatus : 200, 
            response: result.errorStatus ? "" : result 
        };
    },
    fetchCertificateTreeAsync: async (root) => {
        console.log("Fetching Tree...")
        let result = await CertificateStore.fetchTreeAsync(root);

        if(result == undefined){
            return { status: 500 };
        }
        
        let status = result != undefined ? 200 : 404;

        if(status == 200){
            console.log("Completed.");
        }

        return {
            status: status,
            response: result
        };
    },
    fetchCertificateTreesAsync: async () => {
        let roots = await CertificateStore.fetchRootsAsync();
        let ret = []
        for(let i = 0 ; i < roots.length ; i++){
            let tree = await (await CertificateService.fetchCertificateTreeAsync(roots[i].id.toString())).response;
            ret.push(tree);
        }

        return { status:200, response: ret };
    },
    fetchUpToRootAsync: async (childSerialNumber) => {
        let result = await CertificateStore.fetchUpToRootAsync(childSerialNumber);
        return { 
            status: result == null ? 404 : 200, 
            response: result == null ? {errorMessage:"Certificate with serialNumber " + childSerialNumber + " was not found in database"} : result 
        };
    },
    removeAll: async () => {
        console.log("Cleaning Certificates...");
        await CertificateStore.dropAsync();
        console.log("Completed.");
        return { status: 200 };
    },
    revokeAsync: async (id) => {
        let tree = await CertificateStore.fetchTreeAsync(id);
        let date = Math.floor(new Date().getTime()/ 1000)
        try{
            await CertificateStore.revokeOneAsync(tree.id.toString(), date);

            if(tree.children){
                await revokeChildrenInternal(tree.id.toString(), date);
            }

            return { status:200 };
        }
        catch(err){
            console.error(err);
            return { status:400 };
        }
    },
    restoreAsync: async (id) => {
        let tree = await CertificateStore.fetchTreeAsync(id);
        try{
            await CertificateStore.restoreOneAsync(tree.id.toString());

            if(tree.children){
                await restoreChildrenInternal(tree.id.toString());
            }

            return { status:200 };
        }
        catch(err){
            console.error(err);
            return { status:400 };
        }

    }
}


const revokeChildrenInternal = async (fromRoot, date) => {
    let nodes = await CertificateStore.fetchChildrenAsync(fromRoot);

    for(let i = 0 ; i < nodes.length ; i++){
        let id = nodes[i]._id.toString();

        await CertificateStore.revokeOneAsync(id, date);
        await revokeChildrenInternal(id, date);
    }

}

const restoreChildrenInternal = async (fromRoot) => {
    let nodes = await CertificateStore.fetchChildrenAsync(fromRoot);

    for(let i = 0 ; i < nodes.length ; i++){
        let id = nodes[i]._id.toString();

        await CertificateStore.restoreOneAsync(id);
        await restoreChildrenInternal(id);
    }

}

export default CertificateService;