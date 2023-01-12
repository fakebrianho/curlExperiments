uniform float uOpacity;
uniform float bounds;
varying vec3 p;
varying float vDistance;
void main() {
  vec3 color = vec3(0.34, 0.53, 0.96);
  vec3 sunset = vec3(255.0 / 255.0, 100.0 / 255.0, 10.0/255.0);
  // Create a strength variable that's bigger the closer to the center of the particle the pixel is
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  // Make it decrease in strength *faster* the further from the center by using a power of 3
  strength = pow(strength, 3.0);
  float b = bounds;
  b*=0.5; 
   // gl_FragColor = vec4(vec3(1.0), 0.25);
  // vec3 finalColor = vec3(1.0);
  vec3 finalColor = p;
  // gl_FragColor = vec4(vec3(1.0, 0.0, 0.0), uOpacity);
  // if(p.x < -bounds || p.x > bounds || p.y > bounds || p.y < -bounds || p.z < -bounds || p.z > bounds){
  //   finalColor = p;
  // }

  // color = mix()
  color = mix(color, sunset, vDistance * 0.5);
  color = mix(vec3(0.), sunset, strength);

  gl_FragColor = vec4(color, strength);

}