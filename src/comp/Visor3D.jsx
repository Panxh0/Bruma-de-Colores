import React, { Suspense } from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, useGLTF, Center, Bounds} from '@react-three/drei';
import Navbar from './nav';

const Model = ({url}) => {
    <Navbar />


    const {scene} = useGLTF(url); //ruta del modelo 3D

    return <primitive object={scene} scale={1} position={[0.2, 0, 0]} />;
};

const Visor3D = ({modelPath}) => {
    return (

        <div style={{height: '100%', width: '100%'}}>

            <Canvas camera={{ position: [2, 2, 2], fov: 60 }} 
            style={{ background: '#f8f8f8' }} >

                

            <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            enableDamping={true} 
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2} 
            />

            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, 0]} angle={0.15} penumbra={1} intensity={0.5} />      
            <Bounds fit clip observe margin={1.2}> 
                <Center>                
                    <Suspense fallback={null}>
                        <Model url={modelPath} />
                    </Suspense>
                </Center>
            </Bounds>
            </Canvas>
        </div>
    );
};

export default Visor3D;