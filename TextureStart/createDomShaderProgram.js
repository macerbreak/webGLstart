const createDomShaderProgram = (gl,vectId,fragId) =>{
    const vShaderText = document.getElementById(vectId).text
    const fShaderText = document.getElementById(fragId).text
    const vShader = getShader(gl,"vs", vShaderText)
    const fShader = getShader(gl, "fs", fShaderText)
    const shaderProgram = getProgram(gl, vShader,fShader)
    return shaderProgram
}