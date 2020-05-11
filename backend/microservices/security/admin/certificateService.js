const certificateStore = require('./certificateStore');
const { generateCertificate } = require('../certificateBuilder/builder');
const moment = require('moment');

const certificateService = {
    createCertificateAsync: async (certObject, parentId) => {
        certObject.validFrom = moment.unix(certObject.validFrom).toDate();
        certObject.validTo = moment.unix(certObject.validTo).toDate();
        certObject.serialNumber = await certificateStore.fetchCountAsync() + 1;

        if(parentId != null && parentId != undefined){
            let parentObject = await certificateStore.fetchAsync(parentId);

            if(parentObject == undefined){
                return {status: 404 };
            }
            console.log("Generating Cert...");
            let resultBuffer = await generateCertificate(certObject, parentObject.certificate, parentObject.privateKey, 'keystorepassword'); //[certificate, privateKey]
            console.log("Storing...");
            let storeResult = await certificateStore.storeAsync(resultBuffer, parentId);

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
            let storeResult = await certificateStore.storeAsync(resultBuffer);

            if(storeResult.status == 200){
                console.log("Completed. InsertedID: " + storeResult.insertedId);
            }

            return {status: storeResult.status, response: { "insertedID": storeResult.insertedId }};
        }
    },
    fetchCertificateAsync: async (id) => {
        let result = await certificateStore.fetchAsync(id);
        return {
            status: result.errorStatus ? result.errorStatus : 200, 
            response: result.errorStatus ? "" : result 
        };
    },
    fetchCertificateTreeAsync: async (root) => {
        console.log("Fetching Tree...")
        let result = await certificateStore.fetchTreeAsync(root);

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
        let roots = await certificateStore.fetchRootsAsync();
        let ret = []
        for(let i = 0 ; i < roots.length ; i++){
            let tree = await (await CertificateService.fetchCertificateTreeAsync(roots[i].id.toString())).response;
            ret.push(tree);
        }

        return { status:200, response: ret };
    },
    fetchUpToRootAsync: async (childSerialNumber) => {
        let result = await certificateStore.fetchUpToRootAsync(childSerialNumber);
        return { 
            status: result == null ? 404 : 200, 
            response: result == null ? {errorMessage:"Certificate with serialNumber " + childSerialNumber + " was not found in database"} : result 
        };
    },
    removeAll: async () => {
        console.log("Cleaning Certificates...");
        await certificateStore.dropAsync();
        console.log("Completed.");
        return { status: 200 };
    },
    revokeAsync: async (id) => {
        let tree = await certificateStore.fetchTreeAsync(id);
        let date = Math.floor(new Date().getTime()/ 1000)
        try{
            await certificateStore.revokeOneAsync(tree.id.toString(), date);

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
        let tree = await certificateStore.fetchTreeAsync(id);
        try{
            await certificateStore.restoreOneAsync(tree.id.toString());

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
    let nodes = await certificateStore.fetchChildrenAsync(fromRoot);

    for(let i = 0 ; i < nodes.length ; i++){
        let id = nodes[i]._id.toString();

        await certificateStore.revokeOneAsync(id, date);
        await revokeChildrenInternal(id, date);
    }

}

const restoreChildrenInternal = async (fromRoot) => {
    let nodes = await certificateStore.fetchChildrenAsync(fromRoot);

    for(let i = 0 ; i < nodes.length ; i++){
        let id = nodes[i]._id.toString();

        await certificateStore.restoreOneAsync(id);
        await restoreChildrenInternal(id);
    }

}

module.exports = certificateService;