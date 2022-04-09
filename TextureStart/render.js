const render = (gl,PROJMATRIX,MODELMATRIX,VIEWMATRIX,u_Pmatrix,u_Mmatrix,u_Vmatrix,TRIANGLE_VERTEX,TRIANGLE_FACES,a_Position,a_uv,tex,MouseContr)=>{
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearDepth(1.0);

    let old_time = 0;
    let  Z = 0.;
    const  AMORTIZATION=0.95;
    const animate = (time) => {
        MouseContr.dX *= AMORTIZATION, MouseContr.dY *= AMORTIZATION;
        MouseContr.theta += MouseContr.dX, MouseContr.phi += MouseContr.dY;
        const dt=time-old_time;
        Z = Z + MouseContr.dZ;


        mat4.identity(MODELMATRIX);
        mat4.translate(MODELMATRIX, [0.0, 0.0, Z]);
        mat4.rotateX(MODELMATRIX , MouseContr.phi);
        mat4.rotateY(MODELMATRIX , MouseContr.theta);
        old_time = time;

        gl.clearColor(0.5,0.5,0.5,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(u_Pmatrix, false, PROJMATRIX);
        gl.uniformMatrix4fv(u_Mmatrix, false, MODELMATRIX);
        gl.uniformMatrix4fv(u_Vmatrix, false, VIEWMATRIX);


        if (tex.image.webGLtexture){
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D,tex.image.webGLtexture);
        }


        gl.bindBuffer(gl.ARRAY_BUFFER,TRIANGLE_VERTEX);

        gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,4*(3+2),0);
        gl.vertexAttribPointer(a_uv,2,gl.FLOAT,false,4*(3+2),3*4);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
        gl.drawElements(gl.TRIANGLES,triangle_face.length, gl.UNSIGNED_SHORT, 0);

        gl.flush();

        window.requestAnimationFrame(animate);
    }
    animate(0);
}