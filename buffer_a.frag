const float c = 1.; // Courant number

vec2 coord_to_uv(vec2 coord) {
    vec2 uv = coord / iResolution.xy;
    uv = uv * 2. - 1.;
    uv.x *= iResolution.x / iResolution.y;
    return uv;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = coord_to_uv(fragCoord);

    // Mouse interaction
    vec2 mouse_pos_uv = coord_to_uv(iMouse.xy);
    bool mouse_circ = (iMouse.z > 0.) && distance(mouse_pos_uv, uv) < 0.1;
    
    // Border
    const float border = 1.;
    bool in_border = any(lessThan(fragCoord, vec2(border)))
        || any(greaterThan(fragCoord, iResolution.xy - vec2(border)));
    
    // Obstacles
    if (in_border || mouse_circ) {
        fragColor = vec4(0.);
        return;
    }

    // Initialization
    if (iFrame <= 1) {
        float k = float(length(uv) < 0.1);
        fragColor = vec4(k, k, 0., 1.);
        return;
    }
    
    // Compute kernel
    vec2 center_prev = texture(iChannel0, fragCoord.xy / iResolution.xy).xy;
    float center = center_prev.x;
    float prev = center_prev.y;

    float up = texture(iChannel0, (fragCoord.xy + vec2(0, 1)) / iResolution.xy).x;
    float down = texture(iChannel0, (fragCoord.xy + vec2(0, -1)) / iResolution.xy).x;

    float right = texture(iChannel0, (fragCoord.xy + vec2(-1, 0)) / iResolution.xy).x;
    float left = texture(iChannel0, (fragCoord.xy + vec2(1, 0)) / iResolution.xy).x;
    
    float next;
    
    // Solve differential equation
    float ddy = (up - 2. * center + down);
    float ddx = (right - 2. * center + left);
    
    if (iFrame <= 1) {
        // n = 1 special case
        next = center - .5 * c * (ddy + ddx);
    } else {
        next = -prev + 2. * center + .5 * c * (ddy + ddx);
    }
  
    
    fragColor = vec4(next, center, 0., 1.);
}

