void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Output to screen
    float u = texture(iChannel0, uv).x;
    
    vec3 color;
    if (u > 0.) {
        color = vec3(1., 0.01, 0.01) * u;
    } else {
        color = vec3(0.01, 0.01, 1.) * -u;
    }
   
   
    fragColor = vec4(color, 1.);
    //fragColor = texture(iChannel0, uv);
}
