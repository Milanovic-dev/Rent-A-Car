const fs = require('fs');


const generateWSDL = (services) => {

    const serviceFunctions = [];

    Object.keys(services.WebhookService.WebhookPort).forEach((item, i) => {
        serviceFunctions.push(services.WebhookService.WebhookPort[item]);
    });

    let data = '<?xml version="1.0"?>';
    data += headers();
    data += types(serviceFunctions);
    data += messages(serviceFunctions);
    data += port(serviceFunctions);
    data += bidings(serviceFunctions);
    data += createSOAPService();
    data += '\n</wsdl:definitions>';
    try{
        fs.writeFileSync('./service.wsdl', data, {flag: 'w+'})
    }catch(err){
        console.error(err);
        console.error('Generating wsdl failed.');
    }
};


const headers = () => {
    let data = '\n<wsdl:definitions name="WebHook"\n targetNamespace="http://localhost:4000/webhook.wsdl"\n xmlns:tns="http://localhost:4000/webhook.wsdl"\n xmlns:xsd1="http://localhost:4000/webhook.xsd"\n xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"\n xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"\n>'
    return data;
}

const types = (services) => {
    let data = '\n<wsdl:types>\n<xsd:schema targetNamespace="http://localhost:4000/webhook.xsd" xmlns:xsd="http://www.w3.org/2000/10/XMLSchema">';
    
    for(const service of services){
        data += createType(service);
    }
    
    
    data += '\n</xsd:schema>\n</wsdl:types>';
    return data;
}


const createType = (service) => {
    let data = `
            <xsd:element name="${service.name}Request">
                <xsd:complexType>
                    <xsd:all>
                        <xsd:element name="requestBody" nillable="false"  type="string" />
                    </xsd:all>
                </xsd:complexType>
            </xsd:element>`
    
    data += `
            <xsd:element name="${service.name}Response">
                <xsd:complexType>
                    <xsd:all>
                        <xsd:element name="responseBody" nillable="false" type="string" />
                    </xsd:all>
                </xsd:complexType>
            </xsd:element>`

    return data;
}

const messages = (services) => {
    let data = "";
    for(const service of services){
        data += createMessage(service);
    }
    return data;
}

const createMessage = (service) => {
    return `
    <wsdl:message name="${service.name}RequestInput">
        <wsdl:part name="body" element="xsd1:${service.name}Request" />
    </wsdl:message>
    <wsdl:message name="${service.name}RequestOutput">
        <wsdl:part name="body" element="xsd1:${service.name}Response" />
    </wsdl:message>`
}

const port = (services) => {
    let data = '\n<wsdl:portType name="WebhookPort">';
    for(const service of services){
        data += createOperation(service);
    }
    data += '\n</wsdl:portType>';
    return data;
}

const createOperation = (service) => {
    return `
    <wsdl:operation name="${service.name}">
            <wsdl:input message="tns:${service.name}RequestInput" />
            <wsdl:output message="tns:${service.name}RequestOutput" />
    </wsdl:operation>`
}

const bidings = (services) => {
    let data = `
    <wsdl:binding name="WebhookBinding" type="tns:WebhookPort">
        <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>`
    for(const service of services){
        data += createBiding(service);
    }
    data += `</wsdl:binding>`
    return data;
}

const createBiding = (service) => {
    return `
    <wsdl:operation name="${service.name}">
            <soap:operation soapAction="http://localhost:4000/${service.name}" />
            <wsdl:input>
                <soap:body use="literal" />
            </wsdl:input>
            <wsdl:output>
                <soap:body use="literal" />
            </wsdl:output>
        </wsdl:operation>
    `
}

const createSOAPService = () => {
    return `
    <wsdl:service name="WebhookService">
        <wsdl:port name="WebhookPort" binding="tns:WebhookBinding">
            <soap:address location="http://localhost:4000/wsdl" />
        </wsdl:port>
    </wsdl:service>
    `
}

module.exports = {
    generateWSDL
}