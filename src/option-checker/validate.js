const validate = (opts, validOpts) => {
  if (!validOpts) throw Error('Valid options not specified');

  Object.keys(opts).forEach((k) => {
    if (!validOpts[k]) {
      const setName = validOpts.name ? `'${validOpts.name}'` : 'This option';
      throw Error(`Unknown option in ${setName}: '${k}'`);
    }
    const val = opts[k];
    const type = validOpts[k];
    if (!type.check(val)) {
      const optName = validOpts.name ? `${validOpts.name}.${k}` : k;
      throw Error(`Invalid value for '${optName}': ${JSON.stringify(val)} is not a ${type.name}.`);
    }
  });
  return true;
};

export default validate;
