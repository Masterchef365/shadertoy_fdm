void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Output to screen
    vec4 r = texture(iChannel0, uv);
    float u = 8. * (r.x - r.y);
    bool obstacle = r.z > 0.;
    
    u *= 20.;
    
    vec3 color;
    if (u > 0.) {
        color = vec3(1., 0.1, 0.1) * u;
    } else {
        color = vec3(0.1, 0.4, 1.) * -u;
    }
    
    if (obstacle) color = vec3(0.5);
   
    /*float k = abs(u);
    float p = clamp(k * 6., 0., 1.);
   
    color = vec3(p);*/
   
    fragColor = vec4(color, 1.);
    //fragColor = texture(iChannel0, uv);
}

