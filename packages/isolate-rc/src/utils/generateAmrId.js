/**
 * Generates AMR Id consisting of OU code and a random integer.
 * @param {string} orgUnitCode - Organisation unit Code.
 * @returns {string} AMR Id.
 */
export const generateAmrId = orgUnitCode =>
    `${orgUnitCode}${Math.floor(Math.random() * 90000) + 10000}`
