uniform mat4 pMatrix;       // From eye to clip coordinates.
uniform mat4 mvMatrix;      // To get vertex to eye coordinates.
uniform mat3 nmMatrix;      // To get normal to eye coordinates.
uniform vec3 lightPosition; // In eye coordinates.
uniform vec3 color;

attribute vec3 position;    // In scene coordinates.
attribute vec3 normal;      // In scene coordinates.

varying vec3 vColor;

void main(void) {
    vec3 newVertex, lightDirection, eyeDirection, halfVector,
            newNormal, ambient, diffuse, specular;
    float nDotL, nDotH;

    // Put vertex in eye coordinates.
    newVertex = (mvMatrix * vec4(position, 1.0)).xyz;

    // Light direction is vector from vertex to light.
    lightDirection = normalize(lightPosition - newVertex);

    // Eye direction is vector from vertex to eye position.
    // (Assume eye position is (0,0,0), since it's in eye
    // coordinates.)
    eyeDirection = normalize(-newVertex);

    // Put normal in eye coordinates.
    newNormal = normalize(nmMatrix * normal);

    // Calculate dot product normal . lightPosition.
    // (Clamp negative results to zero.)
    nDotL = max(0.0, dot(newNormal, lightDirection));

    // "Ambient," which is the base color for the surface, even
    // where the light isn't shining on it.
    ambient = 0.3 * color;

    // "Diffuse," which depends on the direction the surface is
    // facing and the direction of the light.
    diffuse = 0.7 * color * nDotL;

    // Don't calculate specular component if surface is facing
    // away from light.
    if (nDotL == 0.0) {
        specular = vec3(0.0, 0.0, 0.0);

    } else {
       // "Half vector" is half way between light direction
       // and eye direction.
       halfVector = normalize(lightDirection + eyeDirection);

       // Calculate dot product normal . half vector.
       nDotH = max(0.0, dot(newNormal, halfVector));

       // "Specular," which simulates the reflection of the light
       // source, and depends on the direction of the object, the
       // direction of the light, and the position of the eye.
       // (The exponent can be changed to simulate materials with
       // different "shininess.")
       specular = vec3(1.0, 1.0, 1.0) * pow(nDotH, 2000.0);
    }

    vColor = ambient + diffuse + specular;

    // Don't forget to set the vertex's position.
    gl_Position = pMatrix * vec4(newVertex, 1.0);
}
