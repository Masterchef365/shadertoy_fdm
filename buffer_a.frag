void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    const float c = 0.5;
    
    const float border = 8.;
    if (any(lessThan(fragCoord, vec2(border)))
        || any(greaterThan(fragCoord, iResolution.xy - vec2(border)))
    ) {
        fragColor = vec4(0.);
        return;
    }

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
    
    float next;
    
    float ddy = (up - 2. * center + down);
    float ddx = (right - 2. * center + left);
    
    if (iFrame <= 1) {
        next = center - .5 * c * (ddy + ddx);
    } else {
        next = -prev + 2. * center + .5 * c * (ddy + ddx);
    }
    
    fragColor = vec4(vec3(next), 1.);
}
