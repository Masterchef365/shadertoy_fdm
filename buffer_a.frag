void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    if (iFrame == 0) {
        vec2 g = fract(8. * fragCoord / iResolution.xy);
        fragColor = vec4(g.x > .5 != g.y > .5);
        return;
    }
    
    float prev = texture(iChannel1, fragCoord.xy / iResolution.xy).x;

    float center = texture(iChannel0, fragCoord.xy / iResolution.xy).x;

    float up = texture(iChannel0, (fragCoord.xy + vec2(0, 1)) / iResolution.xy).x;
    float down = texture(iChannel0, (fragCoord.xy + vec2(0, -1)) / iResolution.xy).x;

    float right = texture(iChannel0, (fragCoord.xy + vec2(-1, 0)) / iResolution.xy).x;
    float left = texture(iChannel0, (fragCoord.xy + vec2(1, 0)) / iResolution.xy).x;
    
    float k = (up + down + left + right + center + prev) / 6.;
    
    fragColor = vec4(vec3(k), 1.);
}
