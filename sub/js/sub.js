import * as THREE from 'three';
import {GLTFLoader} from 'gltf';
import {OrbitControls} from 'orbit';

window.addEventListener('load', function(){
    init()
})
async function init(){
    // 렌더러
    const canvas = document.querySelector('canvas')

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,// 배경 투명
        antialias: true,// 경계면 계단 현상 방지
    })
    renderer.shadowMap.enabled = true;
    const rtWidht = $('canvas').width();
    const rtHeight = $('canvas').height();
    renderer.setSize(rtWidht, rtHeight)
    // renderer.outputEncoding = THREE.sRGBEncoding;// 캔버스 사용시 필요함
    // document.body.appendChild(renderer.domElement);

    // 2. 씬
    const scene = new THREE.Scene();

    // 3. 카메라
    const camera = new THREE.PerspectiveCamera( 75,
        rtWidht / rtHeight,// 렌더러와 카메라 높이,너비가 같아야한다.
        1, 500 );
    camera.position.set(1.8,0.7,4.7);

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    controls.enableZoom = false; // 줌 안됨.

    // 4. 객체
    const glefLoader = new GLTFLoader()
    const gltf = await glefLoader.loadAsync('./models/scene.gltf')
    const Camera = gltf.scene;
    Camera.castShadow = true;
    Camera.traverse(object => {
        if(object.isMesh){
            object.castShadow = true;
        }
    })
    scene.add(Camera)
    
    // 5. Light
    const ambLight = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add( ambLight );
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( -5 , 10 , 10 )
    scene.add( directionalLight );
    const pointlight = new THREE.PointLight( 0xff0000, 1, 100 );
    pointlight.position.set( 2, 2, 0 );
    pointlight.castShadow = true;
    scene.add( pointlight );

    // const sphereSize = 1;
    // const pointLightHelper = new THREE.PointLightHelper( pointlight, sphereSize );
    // scene.add( pointLightHelper );

    // 바닥
    const geometry = new THREE.CircleGeometry( 3.2, 80 ); 
    const material = new THREE.MeshPhongMaterial( { color: '#ffffff' } ); 
    const circle = new THREE.Mesh( geometry, material );
    circle.position.set(0,-1.1,0)
    circle.rotation.x = Math.PI * -0.5;
    circle.receiveShadow = true;
    scene.add( circle );


    // 렌더
    render();

    function render() {
        renderer.render(scene, camera);
        controls.update();
        camera.lookAt(Camera.position);
        requestAnimationFrame(render);
    }

    function handleResize() {
        camera.aspect = rtWidht / rtHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(rtWidht, rtHeight);

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', handleResize);
    $(window).on("resize",function(){
        document.location.reload('canvas')
    })
}