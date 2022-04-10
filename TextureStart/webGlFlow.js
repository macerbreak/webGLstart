const webGLStart = () =>{
    const canvas = document.getElementById("canvasGL")
    const gl = canvas.getContext("webgl", {antialias: true})
    const MouseContr = new MouseController(gl)
    const shaderProgram = createDomShaderProgram(gl,"vertex_shader", "fragment_shader")

    const u_Pmatrix = gl.getUniformLocation(shaderProgram, "u_Pmatrix")
    const u_Mmatrix = gl.getUniformLocation(shaderProgram, "u_Mmatrix")
    const u_Vmatrix = gl.getUniformLocation(shaderProgram, "u_Vmatrix")

    const a_Position = gl.getAttribLocation(shaderProgram, "a_Position")
    const a_uv = gl.getAttribLocation(shaderProgram, "a_uv")
    const u_sampler1 = gl.getUniformLocation(shaderProgram,"sampler1" )
    const u_sampler2 = gl.getUniformLocation(shaderProgram,'sampler2');

    gl.uniform1i(u_sampler1, 0)
    gl.uniform1i(u_sampler2, 1);
    gl.enableVertexAttribArray(a_Position)
    gl.enableVertexAttribArray(a_uv)

    // const TRIANGLE_VERTEX = gl.createBuffer()
    // const TRIANGLE_FACES = gl.createBuffer()
    // gl.bindBuffer(gl.ARRAY_BUFFER, TRIANGLE_VERTEX)
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle_vertex), gl.STATIC_DRAW)
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES)
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle_face),gl.STATIC_DRAW)
    const tex = get_texture(gl,"./assets/smile.png")

    loadJSON(gl, "./assets/monkey.json")

    const ModelVertices = gl.model.meshes[0].vertices
    const ModelIndices = [].concat.apply([],gl.model.meshes[0].faces)
    const ModelTexCoords = gl.model.meshes[0].texturecoords[0]
    const ModelNormal = gl.model.meshes[0].normals
    const TRIANGLE_VERTEX = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, TRIANGLE_VERTEX)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ModelVertices), gl.STATIC_DRAW)

    const TRIANGLE_UV = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER,TRIANGLE_UV)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ModelTexCoords), gl.STATIC_DRAW)

    const TRIANGLE_FACES = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,TRIANGLE_FACES)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ModelIndices), gl.STATIC_DRAW)

    const PROJMATRIX = mat4.perspective(40,canvas.width/canvas.height,1,100)
    const MODELMATRIX = mat4.create()
    const VIEWMATRIX = mat4.create()

    mat4.identity(MODELMATRIX);
    mat4.identity(VIEWMATRIX);
    mat4.rotateX(MODELMATRIX,0);
    mat4.lookAt([0.0, 0.0, 10.0],[0.0, 0.0, 0.0],[0.0, 1.0, 0.0],VIEWMATRIX);
    render(gl,
        PROJMATRIX,
        MODELMATRIX,
        VIEWMATRIX,
        u_Pmatrix,
        u_Mmatrix,
        u_Vmatrix,
        TRIANGLE_VERTEX,
        TRIANGLE_FACES,
        TRIANGLE_UV,
        a_Position,
        a_uv,
        tex,
        MouseContr,
        ModelIndices
    )
}