const getShader = (gl, shaderId, shaderText) =>{
    let shader
    if(shaderId === "vs"){
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else if(shaderId === "fs"){
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else {return null}
    gl.shaderSource(shader, shaderText);
    gl.compileShader(shader);
    return shader

}