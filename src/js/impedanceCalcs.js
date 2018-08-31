import { ellipk } from './specialFunctions';

/**
 * Computes the characteristic impedance of a coaxial cross section
 * @param {number} r1 - Radius of inner coax conductor
 * @param {number} r2 - Radius of outer coax conductor
 * @param {number} eps_r - relative permittivity of the insulator
 * 
 * @returns {number} The characteristic of the coplanar waveguide
*/
export function coax(r1,r2, eps_r) {
  return (138 / Math.sqrt(eps_r) * Math.log10(r2 / r1));
}

/**
 * Computes the lineImpedance of coplanar waveguide with only upper ground plane
 * @param {number} s - The width of the center trace
 * @param {number} w - The gap between trace and ground planes
 * @param {number} h - height above ground plane
 * @param {number} eps_r - relative permittivity of substrate
 * 
 * @returns {number} The line impedance of the coplanar waveguide
 * 
 * From Coplanar Waveguide Circuits, Components, and Systems. Rainee N. Simons
 * ISBNs: 0-471-16121-7 (Hardback); 0-471-22475-8 (Electronic)
 * Chapter 2
 */
export function cpw(s, w, h, eps_r) {
  
  const k0 = s/(s + 2*w);
  const k0p = Math.sqrt(1 - Math.pow(k0,2));
  const k1 = Math.sinh(Math.PI*s/(4*h)) / Math.sinh(Math.PI*(s + 2*w)/(4*h));
  const k1p = Math.sqrt(1 - Math.pow(k1,2));

  const eps_eff = 1 + (eps_r-1) / 2 * ellipk(k1) / ellipk(k1p) * ellipk(k0p) / ellipk(k0);

  const z0 = 30*Math.PI / Math.sqrt(eps_eff) * ellipk(k0p) / ellipk(k0);
  
  return {
    z0,
    eps_eff
  };
}

/**
 * Computes the lineImpedance of conductor-backed (grounded_ coplanar waveguide
 * @param {number} s - The width of the center trace
 * @param {number} w - The gap between trace and ground planes
 * @param {number} h - height above ground plane
 * @param {number} eps_r - relative permittivity of substrate
 * 
 * @returns {number} The line impedance of the coplanar waveguide
 * 
 * From Coplanar Waveguide Circuits, Components, and Systems. Rainee N. Simons
 * ISBNs: 0-471-16121-7 (Hardback); 0-471-22475-8 (Electronic)
 * Chapter 3
 */
export function gcpw(s, w, h, eps_r) {
  
  const k = s/(s + 2*w);
  const kp = Math.sqrt(1 - Math.pow(k,2));
  const k3 = Math.tanh(Math.PI*s/(4*h)) / Math.tanh(Math.PI*(s + 2*w)/(4*h));
  const k3p = Math.sqrt(1 - Math.pow(k3,2));

  const eps_eff = (1 + eps_r * ellipk(kp)/ellipk(k) * ellipk(k3)/ellipk(k3p)) / 
                  (1 + ellipk(kp)/ellipk(k) * ellipk(k3)/ellipk(k3p));

  const z0 = 60*Math.PI / Math.sqrt(eps_eff) * 1 / (ellipk(k)/ellipk(kp) + ellipk(k3)/ellipk(k3p));
  
  return {
    z0,
    eps_eff
  };
}

export function microstrip(w, t, h, eps_r) {
  const r = w/h; // trace width to sub height ratio
  let r_eff = r; // effective trace width to sub heigh given trace thickness
  
  if (r < 0.5 / Math.PI) {
    r_eff = 1;
  } else {
    r_eff = 1.1;
  }
  console.log(w, t, h, eps_r, r_eff);
}

/**
 * Computes the lineImpedance of conductor-backed (grounded_ coplanar waveguide
 * @param {number} w - The width of the center trace
 * @param {number} h - total substrate thickness (not half, labelled 'b' in textbook
 * @param {number} t - The gap between trace and ground planes
 * @param {number} eps_r - relative permittivity of substrate
 * 
 * @returns {number} The line impedance of the coplanar waveguide
 * 
 * From Advanced Engineering Electrodynamics - Balanis - 8.8.1
 */
export function stripline(w, h, t, eps_r) {
  const term1 = 30*Math.PI/Math.sqrt(eps_r);
  const cp = (w/h) / (1 - t/h);
  let cf = 0.4413; // for zero thickenss case
  if (t != 0) {
    cf = 1/Math.PI * ( 2/(1-t/h) * Math.log(1 + 1/(1-t/h))
                - (1/(1-t/h) - 1) * Math.log(1/Math.pow(1-t/h, 2) - 1) );
  }
  
  return term1 / (cp + cf);
}

export default { coax, cpw , gcpw, microstrip, stripline};

