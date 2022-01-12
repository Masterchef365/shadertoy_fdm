void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    if (iFrame == 0) {
        fragColor = vec4(vec3(0.), 1.);
        return;
    }

    fragColor = texture(iChannel0, fragCoord / iResolution.xy);
}
