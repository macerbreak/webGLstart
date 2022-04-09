const getProgram = (gl,vShader,fShader) =>{
    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vShader)
    gl.attachShader(shaderProgram, fShader)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)
    return shaderProgram
}