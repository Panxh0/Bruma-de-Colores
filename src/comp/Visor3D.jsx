import React, { Suspense } from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, useGLTF} from '@react-three/drei';

const Model = ({url}) => {


    const {scene} = useGLTF(url); //ruta del modelo 3D

    return <primitive object={scene} scale={20} position={[0, 0, 0]} />;

};

const Visor3D = ({modelPath}) => {
    return (
        <div style={{height: '100%', width: '100%'}}>
            <Canvas camera = {{position: [5,5,5], fov: 100}}>

                <OrbitControls 
                enableZoom={true}
                enablePen = {false} //deshabilita el movimiento lateral para enfocar el giro.
                maxPolarAngle={Math.PI / 2} //limita la rotacion vertical.
                minPolarAngle={Math.PI / 4} //limita la rotacion vertical.
                />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={10} penumbra={5} intensity={5} />
                <pointLight position={[-10, -10, -10]} intensity={10} />
                

                <Suspense fallback={null}>
                    <Model url={modelPath} />
                </Suspense>

            </Canvas>
        </div>
    );
};

export default Visor3D;