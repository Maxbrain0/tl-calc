/** 
 * Computes the complete elliptical integraal of the first kind
 * https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_first_kind
 * The computation is performed using the arithmentic-geometric mean
 * 
 * A max number of iterations is set. User can set convergence as agm parameter
 * 
 * This version of the elliptical integral uses k, instead of m. m = k^2
*/
export function ellipk(k) {
  return Math.PI / 2 * 1 / (agm(1, Math.sqrt(1-Math.pow(k,2)), 1E-12, 25));
}

/**
 * To be used in ellipk calculation
*/
function agm(a0, g0, convergence, maxIterations) {
  let a_n = a0;
  let g_n = g0;
  for (let n = 1; n <= maxIterations; n++) {
    let a_n_1 = 1/2 * (a_n + g_n);
    let g_n_1 = Math.sqrt(a_n*g_n);
    // console.log(n, a_n_1, g_n_1);
    if ((a_n_1-g_n_1) < convergence) {
      a_n = a_n_1;
      break;
    }
    a_n = a_n_1;
    g_n = g_n_1;

  }

  return a_n;
}

export default { ellipk }