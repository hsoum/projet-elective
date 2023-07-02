var express = require('express');
var router = express.Router();

// create list of files organized by folder from /file/components and put them in a const
const fs = require('fs');
const path = require('path');
const componentsPath = path.join(__dirname, '../files/components');
// return a list of files organized by folder from /file/components
function getComponents() {
    const components = [];
    const files = fs.readdirSync(componentsPath);
    files.forEach((file) => {
        const component = {
            name: file,
            path: path.join(componentsPath)
        };
        components.push(component);
    }
    );
    return components;
}
const components = getComponents();

//return the list to a vue component
router.get('/', function (req, res, next) {
    this.components = getComponents();
    res.json(components);
}
);

//pass the chosen file to the vue component
router.get('/:name', function (req, res, next) {
    const component = components.find((component) => {
        return component.name === req.params.name;
    }
    );
    //respond with the file
    res.sendFile(path.join(component.path, component.name));
}
);

//create a new file
router.post('/create', function (req, res, next) {
    const componentName = req.body.componentName;
    const componentPath = path.join(componentsPath, componentName);
    //create just the file no new directory

    fs.writeFileSync(componentPath, `<template>
    <div></div>
    </template>

    <script>
    export default {
    name: '${componentName}'
    }
    </script>

    <style scoped>

    </style>`);
    res.json({
        name: componentName,
        path: componentPath
    }
    );
}
);

//delete a file
router.delete('/delete/:name', function (req, res, next) {
    const component = components.find((component) => {
        return component.name === req.params.name;
    }
    );
    const componentPath = component.path;
    fs.rmdirSync(componentPath, { recursive: true });
    res.json({
        name: component.name,
        path: componentPath
    }
    );
}
);

//edit a file
router.put('/edit/:name', function (req, res, next) {
    const component = components.find((component) => {
        return component.name == req.params.name;
    }

    );
    console.log(req.body);

    const componentPath = component.path;
    console.log(componentPath);
    const componentName = component.name;
    const componentContent = req.body.componentData;
    fs.writeFileSync(path.join(componentsPath, `${componentName}`), componentContent);
    res.json({
        name: componentName,
        path: componentPath,
        content: componentContent
    }
    );
    // publish the changes on npm
    const { exec } = require('child_process');
    exec(`cd ${componentPath} && npm publish`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(stdout);
    }
    );
}
);

module.exports = router;