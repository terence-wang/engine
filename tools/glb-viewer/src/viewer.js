var assetsFolder = "../../examples/assets";

var Viewer = function (canvas) {

    var self = this;

    // create the application
    var app = new pc.Application(canvas, {
        mouse: new pc.Mouse(canvas),
        touch: new pc.TouchDevice(canvas)
    });

    var getCanvasSize = function () {
        return {
            width: document.body.clientWidth - 200,
            height: document.body.clientHeight
        };
    };

    app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;

    // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
    var canvasSize = getCanvasSize();
    app.setCanvasFillMode(pc.FILLMODE_NONE, canvasSize.width, canvasSize.height);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    window.addEventListener("resize", function () {
        var canvasSize = getCanvasSize();
        app.resizeCanvas(canvasSize.width, canvasSize.height);
    });
    
    // load cubemap background
    var cubemapAsset = new pc.Asset('helipad.dds', 'cubemap', {
        url: assetsFolder + "/cubemaps/helipad.dds"
    }, {
        rgbm: true
    });
    cubemapAsset.ready(function () {
        app.scene.gammaCorrection = pc.GAMMA_SRGB;
        app.scene.toneMapping = pc.TONEMAP_ACES;
        app.scene.skyboxMip = 1;                        // Set the skybox to the 128x128 cubemap mipmap level
        app.scene.setSkybox(cubemapAsset.resources);
    });
    app.assets.add(cubemapAsset);
    app.assets.load(cubemapAsset);

    // create the orbit camera
    var camera = new pc.Entity("Camera");
    camera.addComponent("camera", {
        fov: 60,
        clearColor: new pc.Color(0.4, 0.45, 0.5)
    });

    // load orbit script
    app.assets.loadFromUrl(
        assetsFolder + "/scripts/camera/orbit-camera.js",
        "script",
        function (err, asset) {
            // setup orbit script component
            camera.addComponent("script");
            camera.script.create("orbitCamera", {
                attributes: {
                    inertiaFactor: 0.1
                }
            });
            camera.script.create("orbitCameraInputMouse");
            camera.script.create("orbitCameraInputTouch");
            app.root.addChild(camera);
        });

    // create the light
    var light = new pc.Entity();
    light.addComponent("light", {
        type: "directional",
        color: new pc.Color(1, 1, 1),
        castShadows: true,
        intensity: 2,
        shadowBias: 0.2,
        shadowDistance: 5,
        normalOffsetBias: 0.05,
        shadowResolution: 2048
    });
    light.setLocalEulerAngles(45, 30, 0);
    app.root.addChild(light);

    app.start();

    // configure drag and drop
    var preventDefault = function (ev) {
        ev.preventDefault();
    };

    var dropHandler = function (ev) {
        ev.preventDefault();

        if (ev.dataTransfer) {
            var items = ev.dataTransfer.items;
            if (items && items.length === 1 && items[0].kind === 'file') {
                var file = items[0].getAsFile();
                self.load(file.name, URL.createObjectURL(file));
            }
        }
    };
    window.addEventListener('dragenter', preventDefault, false);
    window.addEventListener('dragover', preventDefault, false);
    window.addEventListener('drop', dropHandler, false);

    var graph = new Graph(app, 128);
    app.on('prerender', function () {
        if (self.showGraphs) {
            graph.update();
            graph.render();
        }
    });

    //var pt=0;
    //var tt=0;
    var autoLoad = true;

    app.on('update', function () {
        if (self.vm && self.sv && self.skin && self.mi)
        {
            //pt=tt;
            //tt=(tt>=1.0)? 0.0 : tt+0.01;

            var nodes = self.sv.get_m_nodes();

            var it = new pc.VertexIterator(self.vm.vertexBuffer);
            for (var v = 0; v < self.vm.vertexBuffer.numVertices; v++) 
            {

                if (self.vm.ammoInfluence[self.vm.ammoRemap[v]]==0.0)
                {
                    var node = nodes.at( self.vm.ammoRemap[v] );
                    var nodePos = node.get_m_x();
                    var xx = nodePos.x();
                    var yy = nodePos.y();
                    var zz = nodePos.z();
                    it.element[pc.SEMANTIC_POSITION].set(xx, yy, zz);

                    var w0=it.element[pc.SEMANTIC_BLENDWEIGHT].get(0);
                    var w1=it.element[pc.SEMANTIC_BLENDWEIGHT].get(1);
                    var w2=it.element[pc.SEMANTIC_BLENDWEIGHT].get(2);
                    var w3=it.element[pc.SEMANTIC_BLENDWEIGHT].get(3);
                    it.element[pc.SEMANTIC_BLENDWEIGHT].set(Math.min(w0, 0.01),Math.min(w1, 0.01),Math.min(w2, 0.01),Math.min(w3, 0.01));
                }
                else 
                {/*
                    var xx=it.element[pc.SEMANTIC_POSITION].get(0);
                    var yy=it.element[pc.SEMANTIC_POSITION].get(1);
                    var zz=it.element[pc.SEMANTIC_POSITION].get(2);
        
                    var idx0=it.element[pc.SEMANTIC_BLENDINDICES].get(0);
                    var idx1=it.element[pc.SEMANTIC_BLENDINDICES].get(1);
                    var idx2=it.element[pc.SEMANTIC_BLENDINDICES].get(2);
                    var idx3=it.element[pc.SEMANTIC_BLENDINDICES].get(3);
        
                    var wgt0=it.element[pc.SEMANTIC_BLENDWEIGHT].get(0);
                    var wgt1=it.element[pc.SEMANTIC_BLENDWEIGHT].get(1);
                    var wgt2=it.element[pc.SEMANTIC_BLENDWEIGHT].get(2);
                    var wgt3=it.element[pc.SEMANTIC_BLENDWEIGHT].get(3);

                    var v = new pc.Vec3(xx, yy, zz);

                    var v0 = self.skin.matrices[idx0].transformVector(v);
                    var v1 = self.skin.matrices[idx1].transformVector(v);
                    var v2 = self.skin.matrices[idx2].transformVector(v);
                    var v3 = self.skin.matrices[idx3].transformVector(v);

                    v0.scale(wgt0);
                    v1.scale(wgt1);
                    v2.scale(wgt2);
                    v3.scale(wgt3);

                    //var skinned_v = new pc.Vec3(v0.x+v1.x+v2.x+v3.x, v0.y+v1.y+v2.y+v3.y, v0.z+v1.z+v2.z+v3.z);

                    var skinned_local_pivot = new Ammo.btVector3( v0.x+v1.x+v2.x+v3.x, v0.y+v1.y+v2.y+v3.y, v0.z+v1.z+v2.z+v3.z);

                    //self.sv.appendAnchor( j, self.floor.rigidbody.body, skinned_local_pivot, false, weight);*/
                }
                it.next();
            }
            it.end();

            //self.skin.updateMatrices(self.mi.node);
            //self.sv.get_m_anchors().clear();
            
            var mesh = self.vm;
            for (var j = 0; j < mesh.ammoPositions.length/3; j++)
            {
                if (mesh.ammoInfluence[j]==1.0)
                {
                    var xx=mesh.ammoPositions[j*3+0];
                    var yy=mesh.ammoPositions[j*3+1];
                    var zz=mesh.ammoPositions[j*3+2];
        
                    var idx0=mesh.ammoBoneIndices[j*4+0];
                    var idx1=mesh.ammoBoneIndices[j*4+1];
                    var idx2=mesh.ammoBoneIndices[j*4+2];
                    var idx3=mesh.ammoBoneIndices[j*4+3];

                    var wgt0=mesh.ammoBoneWeights[j*4+0];
                    var wgt1=mesh.ammoBoneWeights[j*4+1];
                    var wgt2=mesh.ammoBoneWeights[j*4+2];
                    var wgt3=mesh.ammoBoneWeights[j*4+3];

                    var vert = new pc.Vec4(xx, yy, zz, 1.0);

                    var mat = new pc.Mat4();

                    for (var m = 0; m < 16; m++)
                    {
                        mat.data[m] = self.skin.matrices[idx0].data[m]*wgt0
                                    + self.skin.matrices[idx1].data[m]*wgt1
                                    + self.skin.matrices[idx2].data[m]*wgt2
                                    + self.skin.matrices[idx3].data[m]*wgt3;
                    }

                    mat.in

                    var skinned_vert = mat.transformVec4(vert);

                    var transform = mesh.ammoAnchorBody[j].getWorldTransform();
                    var origin = transform.getOrigin();
                    origin.setValue(skinned_vert.x, skinned_vert.y, skinned_vert.z);

                    //var node = nodes.at( j );
                    //var nodePos = node.get_m_x();
                    //var nx = nodePos.x();
                    //var ny = nodePos.y();
                    //var nz = nodePos.z();

                    //var old_skinned_v = new pc.Vec3(v0.x+v1.x+v2.x+v3.x, v0.y+v1.y+v2.y+v3.y, v0.z+v1.z+v2.z+v3.z);
                    //var skinned_local_pivot = new Ammo.btVector3( skinned_v.x-v.x, skinned_v.y-v.y, skinned_v.z-v.z);
                    
                    //var skinned_local_pivot = new Ammo.btVector3( -(self.floor.position.x-v.x), -(self.floor.position.y-v.y), -(self.floor.position.z-v.z));

                    //self.sv.appendAnchor( j, self.floor.rigidbody.body, skinned_local_pivot, false, mesh.ammoInfluence[j]);
                    //self.sv.appendAnchor( j, mesh.ammoAnchorBody[j], true, mesh.ammoInfluence[j]);
                }
            }
        }
        else
        {
            if (autoLoad == true) 
            {
                autoLoad = false;
                app.assets.loadFromUrl("../../examples/assets/models/skirt_test/skirt_test.json", "model", self._onLoaded.bind(self));
            }
        }
    });

    // store things
    this.app = app;
    this.camera = camera;
    this.light = light;
    this.entity = null;
    this.graph = graph;
    this.showGraphs = false;

    this.vm=null;
    this.skin=null;
    this.mi=null;
    this.sv=null;

};

Object.assign(Viewer.prototype, {
    // reset the viewer, unloading resources
    resetScene: function () {
        var physicsWorld = this.app.systems.rigidbody.dynamicsWorld;
        //var softBodyHelpers = this.app.systems.rigidbody.softBodyHelpers;

        var app = this.app;

        var floor = this.floor;
        if (floor) {
            app.root.removeChild(floor);
            floor.destroy();
            this.floor = null;
        }

        var sv = this.sv;
        if (sv) {
            physicsWorld.removeSoftBody(sv);
            Ammo.destroy(sv);
            this.sv = null;
        }

        var entity = this.entity;
        if (entity) {
            app.root.removeChild(entity);
            entity.destroy();
            this.entity = null;
        }

        if (this.asset) {
            app.assets.remove(this.asset);
            this.asset.unload();
            this.asset = null;
        }

        this.graph.clear();

        this.animationMap = { };
        onAnimationsLoaded([]);
    },

    // move the camera to view the loaded object
    focusCamera: function () {
        var entity = this.entity;
        if (entity) {
            var camera = this.camera;

            var orbitCamera = camera.script.orbitCamera;
            orbitCamera.focus(entity);

            var distance = orbitCamera.distance;
            camera.camera.nearClip = distance / 10;
            camera.camera.farClip = distance * 10;

            var light = this.light;
            light.light.shadowDistance = distance * 2;
        }
    },

    // load model from the url
    load: function (filename, url) {
        this.app.assets.loadFromUrl(url, "container", this._onLoaded.bind(this), filename);
    },

    // play the animation
    play: function (animationName) {
        if (animationName) {
            this.entity.animation.play(this.animationMap[animationName], 1);
        } else {
            this.entity.animation.playing = true;
        }
    },

    // stop playing animations
    stop: function () {
        this.entity.animation.playing = false;
    },

    setSpeed: function (speed) {
        var entity = this.entity;
        if (entity) {
            entity.animation.speed = speed;
        }
    },

    setGraphs: function (show) {
        this.showGraphs = show;
    },

    createFloor: function ( position ) {

        function createMaterial (color) {
            var material = new pc.StandardMaterial();
            material.diffuse = color;
            // we need to call material.update when we change its properties
            material.update()
            return material;
        }

        // create a few materials for our objects
        var white = createMaterial(new pc.Color(1, 1, 1));

        // ***********    Create our floor   *******************

        var floor = new pc.Entity();
        floor.addComponent("model", {
            type: "box"
        });

        // make the floor white
        floor.model.material = white;

        // scale it
        floor.setLocalScale(10, 1, 10);
        floor.setLocalPosition( position );

        // add a rigidbody component so that other objects collide with it
        floor.addComponent("rigidbody", {
            type: "static",
            restitution: 0.5
        });

        // add a collision component
        floor.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(5, 0.5, 5)
        });

        // add the floor to the hierarchy
        this.app.root.addChild(floor);

        return floor;
    },

    copyBlendWeights: function (ref_mesh, mesh, j ) {
        var physicsWorld = this.app.systems.rigidbody.dynamicsWorld;
        var softBodyHelpers = this.app.systems.rigidbody.softBodyHelpers;

        var it = new pc.VertexIterator(ref_mesh.vertexBuffer);
        for (var v = 0; v < ref_mesh.vertexBuffer.numVertices; v++) 
        {
            var xx=it.element[pc.SEMANTIC_POSITION].get(0);
            var yy=it.element[pc.SEMANTIC_POSITION].get(1);
            var zz=it.element[pc.SEMANTIC_POSITION].get(2);

            var idx0=it.element[pc.SEMANTIC_BLENDINDICES].get(0);
            var idx1=it.element[pc.SEMANTIC_BLENDINDICES].get(1);
            var idx2=it.element[pc.SEMANTIC_BLENDINDICES].get(2);
            var idx3=it.element[pc.SEMANTIC_BLENDINDICES].get(3);

            var wgt0=it.element[pc.SEMANTIC_BLENDWEIGHT].get(0);
            var wgt1=it.element[pc.SEMANTIC_BLENDWEIGHT].get(1);
            var wgt2=it.element[pc.SEMANTIC_BLENDWEIGHT].get(2);
            var wgt3=it.element[pc.SEMANTIC_BLENDWEIGHT].get(3);

            if (Math.abs(mesh.ammoPositions[j*3+0]-xx)<0.001 && Math.abs(mesh.ammoPositions[j*3+1]-yy)<0.001 && Math.abs(mesh.ammoPositions[j*3+2]-zz)<0.001)
            {
                mesh.ammoBoneIndices[j*4+0]=idx0;
                mesh.ammoBoneIndices[j*4+1]=idx1;
                mesh.ammoBoneIndices[j*4+2]=idx2;
                mesh.ammoBoneIndices[j*4+3]=idx3;   

                mesh.ammoBoneWeights[j*4+0]=wgt0;
                mesh.ammoBoneWeights[j*4+1]=wgt1;
                mesh.ammoBoneWeights[j*4+2]=wgt2;
                mesh.ammoBoneWeights[j*4+3]=wgt3;                                
            }
            it.next();
        }
        it.end();
    },

    createAnchorBody: function ( x, y, z) {
        var physicsWorld = this.app.systems.rigidbody.dynamicsWorld;

        var transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin( new Ammo.btVector3( x, y, z ) );
        transform.setRotation( new Ammo.btQuaternion( 0, 0, 0, 1) );
        var motionState = new Ammo.btDefaultMotionState( transform );

        var localInertia = new Ammo.btVector3( 0, 0, 0 );

        var shape = new Ammo.btBoxShape( new Ammo.btVector3( 0.5, 0.5, 0.5 ) );
        shape.setMargin( 0.05 );

        shape.calculateLocalInertia( 0, localInertia );

        var rbInfo = new Ammo.btRigidBodyConstructionInfo( 0, motionState, shape, localInertia );
        var body = new Ammo.btRigidBody( rbInfo );

        physicsWorld.addRigidBody( body );

        return body;
    },

    createSoftVolume: function ( mesh, mass, pressure, margin ) {
        var physicsWorld = this.app.systems.rigidbody.dynamicsWorld;
        var softBodyHelpers = this.app.systems.rigidbody.softBodyHelpers;

        mesh.ammoRemap = [];
        mesh.ammoRemap.length = mesh.vertexBuffer.numVertices;

        mesh.ammoPositions = [];
        mesh.ammoBoneIndices = [];
        mesh.ammoBoneWeights = [];
        mesh.ammoInfluence = [];
        mesh.ammoAnchorBody = [];

        mesh.ammoIndices = [];

        var it = new pc.VertexIterator(mesh.vertexBuffer);
        for (var v = 0; v < mesh.vertexBuffer.numVertices; v++) 
        {
            var xx=it.element[pc.SEMANTIC_POSITION].get(0);
            var yy=it.element[pc.SEMANTIC_POSITION].get(1);
            var zz=it.element[pc.SEMANTIC_POSITION].get(2);

            var idx0=it.element[pc.SEMANTIC_BLENDINDICES].get(0);
            var idx1=it.element[pc.SEMANTIC_BLENDINDICES].get(1);
            var idx2=it.element[pc.SEMANTIC_BLENDINDICES].get(2);
            var idx3=it.element[pc.SEMANTIC_BLENDINDICES].get(3);

            var wgt0=it.element[pc.SEMANTIC_BLENDWEIGHT].get(0);
            var wgt1=it.element[pc.SEMANTIC_BLENDWEIGHT].get(1);
            var wgt2=it.element[pc.SEMANTIC_BLENDWEIGHT].get(2);
            var wgt3=it.element[pc.SEMANTIC_BLENDWEIGHT].get(3);

            mesh.ammoRemap[v]=v; 
            for (var j = 0; j < mesh.ammoPositions.length/3; j++)
            {
                if (mesh.ammoPositions[j*3+0]==xx && mesh.ammoPositions[j*3+1]==yy && mesh.ammoPositions[j*3+2]==zz)
                {
                    mesh.ammoRemap[v]=j;
                }
            }
            if (mesh.ammoRemap[v]==v)
            {
                mesh.ammoRemap[v]=mesh.ammoPositions.length/3;
                
                mesh.ammoPositions.push(xx);
                mesh.ammoPositions.push(yy);
                mesh.ammoPositions.push(zz);

                mesh.ammoBoneIndices.push(idx0);
                mesh.ammoBoneIndices.push(idx1);
                mesh.ammoBoneIndices.push(idx2);
                mesh.ammoBoneIndices.push(idx3);

                mesh.ammoBoneWeights.push(wgt0);
                mesh.ammoBoneWeights.push(wgt1);
                mesh.ammoBoneWeights.push(wgt2);
                mesh.ammoBoneWeights.push(wgt3);
            }
            it.next();
        }
        it.end();

        mesh.ammoIndices.length = mesh.indexBuffer[0].numIndices;
        for (var i = 0; i < mesh.indexBuffer[0].numIndices; i++) 
        {
            mesh.ammoIndices[i] = mesh.ammoRemap[mesh.indexBuffer[0].storage[i]];
        }

        // Volume physics object
        var volumeSoftBody = softBodyHelpers.CreateFromTriMesh(
            physicsWorld.getWorldInfo(),
            mesh.ammoPositions,
            mesh.ammoIndices,
            mesh.ammoIndices.length / 3,
            true );

        var sbConfig = volumeSoftBody.get_m_cfg();
        sbConfig.set_viterations( 40 );
        sbConfig.set_piterations( 40 );

        // Soft-soft and soft-rigid collisions
        sbConfig.set_collisions( 0x11 );

        // Friction
        sbConfig.set_kDF( 0.1 );
        // Damping
        sbConfig.set_kDP( 0.01 );
        // Pressure
        sbConfig.set_kPR( pressure );
        // Stiffness
        volumeSoftBody.get_m_materials().at( 0 ).set_m_kLST( 0.9 );
        volumeSoftBody.get_m_materials().at( 0 ).set_m_kAST( 0.9 );

        volumeSoftBody.setTotalMass( mass, false )
        Ammo.castObject( volumeSoftBody, Ammo.btCollisionObject ).getCollisionShape().setMargin( margin );
        physicsWorld.addSoftBody( volumeSoftBody, 1, -1 );
        
        // Disable deactivation
        volumeSoftBody.setActivationState( 4 );

        return volumeSoftBody;
    },

    _onLoaded: function (err, asset) {
        if (!err) {

            var resource = asset.resource;
            //this.resetScene();

            // create entity and add model
            var entity = this.entity;
            if (!this.entity)
            {
                if (asset.type === 'model')
                {
                    this.ref_entity = new pc.Entity();
                    this.ref_entity.addComponent("model", {
                        type: "asset",
                        asset: asset,
                        castShadows: true
                    });
                }
                else
                {
                    entity = new pc.Entity();
                    entity.addComponent("model", {
                        type: "asset",
                        asset: resource.model,
                        castShadows: true
                    });
                }

                if (entity && entity.model && entity.model.meshInstances && entity.model.meshInstances.length>0)//resource.model && resource.model.meshInstances.length>0)
                {
                    this.vm = entity.model.meshInstances[entity.model.meshInstances.length-1].mesh;
                    this.skin = entity.model.meshInstances[entity.model.meshInstances.length-1].skinInstance;
                    this.mi = entity.model.meshInstances[entity.model.meshInstances.length-1];
                    this.sv = this.createSoftVolume(this.vm, 15, 0, 0.05);

                    var tpos = new pc.Vec3();
                    tpos.copy(entity.getLocalPosition());
                    tpos.y -= this.vm.aabb.halfExtents.y+0.5;
                    this.floor = this.createFloor(tpos);

                    for (var j = 0; j < this.vm.ammoPositions.length/3; j++) 
                    {   
                        var xx = this.vm.ammoPositions[j*3+0];
                        var yy = this.vm.ammoPositions[j*3+1];
                        var zz = this.vm.ammoPositions[j*3+2];

                        var top = this.vm.aabb.center.y+this.vm.aabb.halfExtents.y;
                        var height = this.vm.aabb.halfExtents.y*2.0;
                        var weight = pc.math.clamp(1.1-((top-yy)/height), 0.0, 1.0);
                        if (this.floor && weight==1.0)
                        {                            
                            var anchorBody=this.createAnchorBody(xx,yy,zz);

                            this.sv.appendAnchor( j, anchorBody, true, weight);
                            this.vm.ammoInfluence.push(weight);
                            this.vm.ammoAnchorBody.push(anchorBody);

                            this.copyBlendWeights(this.ref_entity.model.meshInstances[0].mesh, this.vm, j );
                        }
                        else
                        {
                            this.vm.ammoInfluence.push(0.0);
                            this.vm.ammoAnchorBody.push(this.floor.rigidbody.body);
                        }
                    }
                }
            }
            // create animations
            if (asset.type != 'model' && resource.animations && resource.animations.length > 0) 
            {
                entity.addComponent('animation', {
                    assets: resource.animations.map(function (asset) {
                        return asset.id;
                    }),
                    speed: 1
                });

                var animationMap = {};
                for (var i = 0; i < resource.animations.length; ++i) {
                    var animAsset = resource.animations[i];
                    animationMap[animAsset.resource.name] = animAsset.name;
                }

                this.animationMap = animationMap;
                onAnimationsLoaded(Object.keys(this.animationMap));

                var createAnimGraphs = function () {
                    var extract = function (index) {
                        return this[index];
                    };

                    var graph = this.graph;
                    var animController = entity.animation.data.animController;
                    var nodes = animController._nodes;
                    var activePose = animController._activePose;

                    for (var i = 0; i < nodes.length; ++i) {
                        var node = nodes[i];

                        graph.addGraph(node,
                                       new pc.Color(1, 0, 0, 1),
                                       extract.bind(activePose, i * 10 + 0));
                        graph.addGraph(node,
                                       new pc.Color(0, 1, 0, 1),
                                       extract.bind(activePose, i * 10 + 1));
                        graph.addGraph(node,
                                       new pc.Color(0, 0, 1, 1),
                                       extract.bind(activePose, i * 10 + 2));

                        graph.addGraph(node,
                                       new pc.Color(1, 0, 0, 1),
                                       extract.bind(activePose, i * 10 + 3));
                        graph.addGraph(node,
                                       new pc.Color(0, 1, 0, 1),
                                       extract.bind(activePose, i * 10 + 4));
                        graph.addGraph(node,
                                       new pc.Color(0, 0, 1, 1),
                                       extract.bind(activePose, i * 10 + 5));
                        graph.addGraph(node,
                                       new pc.Color(1, 1, 0, 1),
                                       extract.bind(activePose, i * 10 + 6));

                        graph.addGraph(node,
                                       new pc.Color(1, 0, 0, 1),
                                       extract.bind(activePose, i * 10 + 7));
                        graph.addGraph(node,
                                       new pc.Color(0, 1, 0, 1),
                                       extract.bind(activePose, i * 10 + 8));
                        graph.addGraph(node,
                                       new pc.Color(0, 0, 1, 1),
                                       extract.bind(activePose, i * 10 + 9));
                    }
                };

                // create animation graphs
                setTimeout(createAnimGraphs.bind(this), 1000);
            }

            if (!this.entity && entity)
            {
                this.app.root.addChild(entity);
                this.entity = entity;
                this.asset = asset;

                this.focusCamera();
            }
        }
    }
});

var viewer;

var main = function () {

    if (wasmSupported()) {
        loadWasmModuleAsync('Ammo', '../../examples/lib/ammo/ammo.wasm.js', '../../examples/lib/ammo/ammo.wasm.wasm', demo);
    } else {
        loadWasmModuleAsync('Ammo', '../../examples/lib/ammo/ammo.js', '', demo);
    }

    function demo() {
        viewer = new Viewer(document.getElementById("application-canvas"));
    }
};
