uniform sampler2D texture_msdfMap;

#ifdef GL_OES_standard_derivatives
#define USE_FWIDTH
#endif

#ifdef GL2
#define USE_FWIDTH
#endif

float median(float r, float g, float b) {
    return max(min(r, g), min(max(r, g), b));
}

float map (float min, float max, float v) {
    return (v - min) / (max - min);
}


uniform float font_sdfIntensity; // intensity is used to boost the value read from the SDF, 0 is no boost, 1.0 is max boost
uniform float font_pxrange;      // the number of pixels between inside and outside the font in SDF
uniform float font_textureWidth; // the width of the texture atlas

uniform vec4 outline_color;
uniform float outline_thickness;
uniform vec4 shadow_color;
uniform vec2 shadow_offset;

uniform float render_pass; // multi-pass render pass

vec4 applyMsdf(vec4 color) {
    // sample the field
    vec4 tsample = texture2D(texture_msdfMap, vUv0);
    //tsample= vec4(tsample.rgb*(1.0/tsample.a), tsample.a);
    vec2 uvShdw = vUv0 - shadow_offset;
    vec4 ssample = texture2D(texture_msdfMap, uvShdw);
    //ssample= vec4(ssample.rgb*(1.0/ssample.a), ssample.a);
    // get the signed distance value
    float sigDist = median(tsample.r, tsample.g, tsample.b);
    float sigDistShdw = median(ssample.r, ssample.g, ssample.b);

    if (0==1)//render_pass==0.0)
    {
        //float tsamplea = texture2D(texture_msdfMap, vUv0).a;
        //float ssamplea = texture2D(texture_msdfMap, uvShdw).a;

        sigDist=mix(sigDist,tsample.a, clamp((0.4-tsample.a)*10.0,0.0,1.0));
        sigDistShdw=mix(sigDistShdw,ssample.a, clamp((0.4-ssample.a)*10.0,0.0,1.0));
    }

    #ifdef USE_FWIDTH
        // smoothing depends on size of texture on screen
        vec2 w = fwidth(vUv0);
        float smoothing = clamp(w.x * font_textureWidth / font_pxrange, 0.0, 0.5);
    #else
        float font_size = 16.0; // TODO fix this
        // smoothing gets smaller as the font size gets bigger
        // don't have fwidth we can approximate from font size, this doesn't account for scaling
        // so a big font scaled down will be wrong...
        float smoothing = clamp(font_pxrange / font_size, 0.0, 0.5); 
    #endif
    float mapMin = 0.05;
    float mapMax = clamp(1.0 - font_sdfIntensity, mapMin, 1.0);

    // remap to a smaller range (used on smaller font sizes)
    float sigDistInner = map(mapMin, mapMax, sigDist);
    float sigDistOutline = map(mapMin, mapMax, sigDist + outline_thickness);
    sigDistShdw = map(mapMin, mapMax, sigDistShdw + outline_thickness);

    float center = 0.5;
    // calculate smoothing and use to generate opacity
    float inside = smoothstep(center-smoothing, center+smoothing, sigDistInner);
    float outline = smoothstep(center-smoothing, center+smoothing, sigDistOutline);
    float shadow = smoothstep(center-smoothing, center+smoothing, sigDistShdw);

    vec4 scolor = max(shadow,outline)*mix(vec4(shadow_color.a * shadow_color.rgb, shadow_color.a), vec4(outline_color.a * outline_color.rgb, outline_color.a), outline);
    vec4 tcolor = mix(scolor, color, inside);
    
    if (render_pass==1.0 && inside==0.0)
    {
        discard;
    }

    if (render_pass==2.0 && outline<1.0)
    {
        discard;
    }

    if (render_pass==3.0 && shadow<1.0)
    {
        discard;
    }

    if (render_pass==4.0 && tcolor.a==0.0) //edge aa
    {
        discard;
    }

    if (render_pass==5.0) //stencil clear
    {
        return vec4(0.0);
    }

    return vec4(tcolor.rgb,tcolor.a);
}