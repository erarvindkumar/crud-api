/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((module) => {

eval("const JWT_SECRET=\"hdshabdhsdajjahs\";\r\nconst ACCESS_TOKEN_SECRET=\"jdsahshksajnsljnd\";\r\nconst REFRESH_TOKEN_SECRET=\"jkbsdahasdwkjijsiaj\";\r\n\r\nmodule.exports = {JWT_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET};\r\n\n\n//# sourceURL=webpack://ofi-restapi/./config/config.js?");

/***/ }),

/***/ "./controllers/post.controllers.js":
/*!*****************************************!*\
  !*** ./controllers/post.controllers.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Post = __webpack_require__(/*! ../model/post.model */ \"./model/post.model.js\");\r\n\r\nconst addPost = async (req, res) => {\r\n  try {\r\n    const { title, content } = req.body;\r\n    if (!req.body) {\r\n        res\r\n          .status(500)\r\n          .json({ message: \"Invalid inputs passed, please check your data.\" });\r\n      }\r\n  \r\n    const post = await Post.create({ title, content });\r\n    res.status(200).json({\r\n        status: true,\r\n        message: \"Create Post successfully\",\r\n        id: post.id,\r\n      });\r\n  } catch (error) {\r\n    console.error(error);\r\n    res.status(500).json({ error: \"Internal Server Error\" });\r\n  }\r\n};\r\n\r\n const getPost = async (req, res) => {\r\n  try {\r\n    const posts = await Post.findAll();\r\n    res.status(200).json({\r\n        status: true,\r\n        message: \"Post Given successfully\",\r\n        data: posts,\r\n      });\r\n  } catch (error) {\r\n    console.error(error);\r\n    res.status(500).json({ error: \"Internal Server Error\" });\r\n  }\r\n};\r\n\r\n const updatePost = async (req, res) => {\r\n  try {\r\n    const { id } = req.params;\r\n    const { title, content } = req.body;\r\n\r\n    const post = await Post.findByPk(id);\r\n    if (!post) {\r\n      return res.status(404).json({ error: \"Post not found\" });\r\n    }\r\n\r\n    post.title = title;\r\n    post.content = content;\r\n    await post.save();\r\n\r\n    res.status(200).json({\r\n        status: true,\r\n        message: \"Edit Post successfully\",\r\n        id: post.id,\r\n      });\r\n  } catch (error) {\r\n    console.error(error);\r\n    res.status(500).json({ error: \"Internal Server Error\" });\r\n  }\r\n};\r\n\r\n const deletePost = async (req, res) => {\r\n  try {\r\n    const { id } = req.params;\r\n\r\n    const post = await Post.findByPk(id);\r\n    if (!post) {\r\n      return res.status(404).json({ error: \"Post not found\" });\r\n    }\r\n\r\n    await post.destroy();\r\n\r\n    res.json({ message: \"Post deleted successfully\" });\r\n  } catch (error) {\r\n    console.error(error);\r\n    res.status(500).json({ error: \"Internal Server Error\" });\r\n  }\r\n};\r\n\r\nmodule.exports = {addPost, getPost, updatePost, deletePost};\n\n//# sourceURL=webpack://ofi-restapi/./controllers/post.controllers.js?");

/***/ }),

/***/ "./controllers/user.controllers.js":
/*!*****************************************!*\
  !*** ./controllers/user.controllers.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const  User = __webpack_require__(/*! ../model/user.model.js */ \"./model/user.model.js\");\r\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\r\nconst {\r\n  signAccessToken,\r\n  signRefreshToken,\r\n  verifyRefreshToken,\r\n  signToken,\r\n  verifyToken,\r\n} = __webpack_require__(/*! ../middleware/auth.js */ \"./middleware/auth.js\");\r\n\r\nconst register = async (req, res) => {\r\n  try {\r\n    const { firstName, lastName, email, password } = req.body;\r\n\r\n    if (!req.body) {\r\n      res\r\n        .status(500)\r\n        .json({ message: \"Invalid inputs passed, please check your data.\" });\r\n    }\r\n\r\n    const doesExist = await User.findOne({ where: { email: email } });\r\n    if (doesExist) {\r\n      res.status(200).json({\r\n        status: false,\r\n        message: \"Email Already Exist \",\r\n      });\r\n    }\r\n\r\n    const pass = await bcrypt.hash(password, 5);\r\n    const data = {\r\n      first_name: firstName,\r\n      last_name: lastName,\r\n      email,\r\n      password: pass,\r\n    };\r\n\r\n    const user = await User.create(data);\r\n    res.status(200).json({\r\n      status: true,\r\n      message: \"Create Account successfully\",\r\n      id: user.id,\r\n    });\r\n  } catch (error) {\r\n    console.error(error);\r\n    res.status(500).json({ status: false, message: \"Internal Server Error\" });\r\n  }\r\n};\r\n\r\nconst login = async (req, res, next) => {\r\n  try {\r\n    const { email, password } = req.body;\r\n    if (!email || !password) {\r\n      res.status(200).send({ message: \"email and password are required\" });\r\n    }\r\n    const user = await User.findOne({ where: { email: email } });\r\n    if (!user) {\r\n      res.status(200).send({ message: \"User not Register\" });\r\n    }\r\n\r\n    var passwordIsValid = bcrypt.compareSync(password, user.password);\r\n    if (!passwordIsValid) {\r\n      return res.status(200).send({ message: \"Invalid Password!\" });\r\n    }\r\n    const accessToken = await signAccessToken(user);\r\n    const refreshToken = await signRefreshToken(user);\r\n    const savedUser = await User.findOne({ where: { email: req.body.email } });\r\n    const userId = savedUser.id;\r\n\r\n    res.json({\r\n      status: true,\r\n      message: \"signin successful\",\r\n      data: {\r\n        accessToken,\r\n        accessExpiry: 24,\r\n        refreshToken,\r\n        refreshExpiry: 720,\r\n        userId,\r\n      },\r\n    });\r\n  } catch (error) {\r\n    console.log(error);\r\n    next(error);\r\n  }\r\n};\r\n\r\nmodule.exports = { register, login };\r\n\n\n//# sourceURL=webpack://ofi-restapi/./controllers/user.controllers.js?");

/***/ }),

/***/ "./databaseConfig/db.js":
/*!******************************!*\
  !*** ./databaseConfig/db.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\nconst sequelize = new Sequelize(\r\n    'postgres',\r\n    'postgres',\r\n    'Pass@125#',\r\n    {\r\n        host: '127.0.0.1',\r\n        dialect: 'postgres'\r\n    }\r\n);\r\n\r\nsequelize.authenticate().then(() => {\r\n    console.log('Connection has been established successfully.');\r\n}).catch((error) => {\r\n    console.error('Unable to connect to the database: ', error);\r\n});\r\n\r\nmodule.exports = sequelize;\r\n\n\n//# sourceURL=webpack://ofi-restapi/./databaseConfig/db.js?");

/***/ }),

/***/ "./middleware/auth.js":
/*!****************************!*\
  !*** ./middleware/auth.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const JWT = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nconst config = __webpack_require__(/*! ../config/config.js */ \"./config/config.js\");\r\n\r\nconst { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = config;\r\n\r\nconst signAccessToken = function (data) {\r\n    return new Promise(function (resolve, reject) {\r\n        const payload = { name: data.name, id: data._id ? data._id : data.id };\r\n        const secret = ACCESS_TOKEN_SECRET;\r\n        JWT.sign(payload, secret, { expiresIn: '24h' }, function (err, token) {\r\n            if (err) {\r\n                console.log(err.message);\r\n                reject(err.message);\r\n                return;\r\n            }\r\n            resolve(token);\r\n        });\r\n    });\r\n};\r\n\r\nconst verifyAccessToken = function (req, res, next) {\r\n    if (!req.headers['authorization']) return next('not in headers');\r\n    const authHeader = req.headers['authorization'];\r\n    const bearerToken = authHeader.split(' ');\r\n    const secret = ACCESS_TOKEN_SECRET;\r\n    const token = bearerToken[1];\r\n    JWT.verify(authHeader, secret, function (err, payload) {\r\n        if (err) {\r\n            const message =\r\n                err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;\r\n            return next(message);\r\n        }\r\n        console.log(payload);\r\n        req.payload = payload;\r\n        next('welcome');\r\n    });\r\n};\r\n\r\nconst signRefreshToken = function (data) {\r\n    return new Promise(function (resolve, reject) {\r\n        const payload = { name: data.name, id: data._id };\r\n\r\n        const secret = REFRESH_TOKEN_SECRET;\r\n        const options = {\r\n            expiresIn: '30d',\r\n        };\r\n        JWT.sign(payload, secret, options, function (err, token) {\r\n            if (err) {\r\n                reject(err.message);\r\n            }\r\n            resolve(token);\r\n        });\r\n    });\r\n};\r\n\r\nconst verifyRefreshToken = function (refreshToken) {\r\n    const secret = REFRESH_TOKEN_SECRET;\r\n    return new Promise(function (resolve, reject) {\r\n        JWT.verify(refreshToken, secret, function (err, payload) {\r\n            if (err) {\r\n                const message =\r\n                    err.name === 'JsonWebTokenError'\r\n                        ? 'Wrong verification key'\r\n                        : err.message;\r\n                reject({ status: 301, success: false, message });\r\n            }\r\n\r\n            return resolve(payload);\r\n        });\r\n    });\r\n};\r\n\r\n\r\nmodule.exports = { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken };\n\n//# sourceURL=webpack://ofi-restapi/./middleware/auth.js?");

/***/ }),

/***/ "./model/post.model.js":
/*!*****************************!*\
  !*** ./model/post.model.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const sequelize = __webpack_require__(/*! ../databaseConfig/db.js */ \"./databaseConfig/db.js\");\r\nconst DataTypes = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst Post = sequelize.define('Post', {\r\n  title: {\r\n    type: DataTypes.STRING,\r\n    allowNull: false\r\n  },\r\n  content: {\r\n    type: DataTypes.TEXT,\r\n    allowNull: false\r\n  }\r\n});\r\n\r\nmodule.exports = { Post };\r\n\n\n//# sourceURL=webpack://ofi-restapi/./model/post.model.js?");

/***/ }),

/***/ "./model/user.model.js":
/*!*****************************!*\
  !*** ./model/user.model.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const sequelize = __webpack_require__(/*! ../databaseConfig/db.js */ \"./databaseConfig/db.js\");\r\nconst DataTypes = __webpack_require__(/*! sequelize */ \"sequelize\");\r\n\r\nconst User = sequelize.define('User', {\r\n  id: {\r\n    type: DataTypes.BIGINT,\r\n    autoIncrement: true,\r\n    primaryKey: true,\r\n    allowNull: false\r\n  },\r\n  first_name: {\r\n    type: DataTypes.STRING(25)\r\n  },\r\n  last_name: {\r\n    type: DataTypes.STRING(25)\r\n  },\r\n  email: {\r\n    type: DataTypes.STRING(100),\r\n    allowNull: false\r\n  },\r\n  password: {\r\n    type: DataTypes.STRING\r\n  }\r\n});\r\n\r\nmodule.exports = { User };\r\n\n\n//# sourceURL=webpack://ofi-restapi/./model/user.model.js?");

/***/ }),

/***/ "./node_modules/dotenv/config.js":
/*!***************************************!*\
  !*** ./node_modules/dotenv/config.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("(function () {\n  (__webpack_require__(/*! ./lib/main */ \"./node_modules/dotenv/lib/main.js\").config)(\n    Object.assign(\n      {},\n      __webpack_require__(/*! ./lib/env-options */ \"./node_modules/dotenv/lib/env-options.js\"),\n      __webpack_require__(/*! ./lib/cli-options */ \"./node_modules/dotenv/lib/cli-options.js\")(process.argv)\n    )\n  )\n})()\n\n\n//# sourceURL=webpack://ofi-restapi/./node_modules/dotenv/config.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/cli-options.js":
/*!************************************************!*\
  !*** ./node_modules/dotenv/lib/cli-options.js ***!
  \************************************************/
/***/ ((module) => {

eval("const re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/\n\nmodule.exports = function optionMatcher (args) {\n  return args.reduce(function (acc, cur) {\n    const matches = cur.match(re)\n    if (matches) {\n      acc[matches[1]] = matches[2]\n    }\n    return acc\n  }, {})\n}\n\n\n//# sourceURL=webpack://ofi-restapi/./node_modules/dotenv/lib/cli-options.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/env-options.js":
/*!************************************************!*\
  !*** ./node_modules/dotenv/lib/env-options.js ***!
  \************************************************/
/***/ ((module) => {

eval("// ../config.js accepts options via environment variables\nconst options = {}\n\nif (process.env.DOTENV_CONFIG_ENCODING != null) {\n  options.encoding = process.env.DOTENV_CONFIG_ENCODING\n}\n\nif (process.env.DOTENV_CONFIG_PATH != null) {\n  options.path = process.env.DOTENV_CONFIG_PATH\n}\n\nif (process.env.DOTENV_CONFIG_DEBUG != null) {\n  options.debug = process.env.DOTENV_CONFIG_DEBUG\n}\n\nif (process.env.DOTENV_CONFIG_OVERRIDE != null) {\n  options.override = process.env.DOTENV_CONFIG_OVERRIDE\n}\n\nif (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {\n  options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY\n}\n\nmodule.exports = options\n\n\n//# sourceURL=webpack://ofi-restapi/./node_modules/dotenv/lib/env-options.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst os = __webpack_require__(/*! os */ \"os\")\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\")\nconst packageJson = __webpack_require__(/*! ../package.json */ \"./node_modules/dotenv/package.json\")\n\nconst version = packageJson.version\n\nconst LINE = /(?:^|^)\\s*(?:export\\s+)?([\\w.-]+)(?:\\s*=\\s*?|:\\s+?)(\\s*'(?:\\\\'|[^'])*'|\\s*\"(?:\\\\\"|[^\"])*\"|\\s*`(?:\\\\`|[^`])*`|[^#\\r\\n]+)?\\s*(?:#.*)?(?:$|$)/mg\n\n// Parse src into an Object\nfunction parse (src) {\n  const obj = {}\n\n  // Convert buffer to string\n  let lines = src.toString()\n\n  // Convert line breaks to same format\n  lines = lines.replace(/\\r\\n?/mg, '\\n')\n\n  let match\n  while ((match = LINE.exec(lines)) != null) {\n    const key = match[1]\n\n    // Default undefined or null to empty string\n    let value = (match[2] || '')\n\n    // Remove whitespace\n    value = value.trim()\n\n    // Check if double quoted\n    const maybeQuote = value[0]\n\n    // Remove surrounding quotes\n    value = value.replace(/^(['\"`])([\\s\\S]*)\\1$/mg, '$2')\n\n    // Expand newlines if double quoted\n    if (maybeQuote === '\"') {\n      value = value.replace(/\\\\n/g, '\\n')\n      value = value.replace(/\\\\r/g, '\\r')\n    }\n\n    // Add to object\n    obj[key] = value\n  }\n\n  return obj\n}\n\nfunction _parseVault (options) {\n  const vaultPath = _vaultPath(options)\n\n  // Parse .env.vault\n  const result = DotenvModule.configDotenv({ path: vaultPath })\n  if (!result.parsed) {\n    throw new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`)\n  }\n\n  // handle scenario for comma separated keys - for use with key rotation\n  // example: DOTENV_KEY=\"dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenv.org/vault/.env.vault?environment=prod\"\n  const keys = _dotenvKey(options).split(',')\n  const length = keys.length\n\n  let decrypted\n  for (let i = 0; i < length; i++) {\n    try {\n      // Get full key\n      const key = keys[i].trim()\n\n      // Get instructions for decrypt\n      const attrs = _instructions(result, key)\n\n      // Decrypt\n      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key)\n\n      break\n    } catch (error) {\n      // last key\n      if (i + 1 >= length) {\n        throw error\n      }\n      // try next key\n    }\n  }\n\n  // Parse decrypted .env string\n  return DotenvModule.parse(decrypted)\n}\n\nfunction _log (message) {\n  console.log(`[dotenv@${version}][INFO] ${message}`)\n}\n\nfunction _warn (message) {\n  console.log(`[dotenv@${version}][WARN] ${message}`)\n}\n\nfunction _debug (message) {\n  console.log(`[dotenv@${version}][DEBUG] ${message}`)\n}\n\nfunction _dotenvKey (options) {\n  // prioritize developer directly setting options.DOTENV_KEY\n  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {\n    return options.DOTENV_KEY\n  }\n\n  // secondary infra already contains a DOTENV_KEY environment variable\n  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {\n    return process.env.DOTENV_KEY\n  }\n\n  // fallback to empty string\n  return ''\n}\n\nfunction _instructions (result, dotenvKey) {\n  // Parse DOTENV_KEY. Format is a URI\n  let uri\n  try {\n    uri = new URL(dotenvKey)\n  } catch (error) {\n    if (error.code === 'ERR_INVALID_URL') {\n      throw new Error('INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development')\n    }\n\n    throw error\n  }\n\n  // Get decrypt key\n  const key = uri.password\n  if (!key) {\n    throw new Error('INVALID_DOTENV_KEY: Missing key part')\n  }\n\n  // Get environment\n  const environment = uri.searchParams.get('environment')\n  if (!environment) {\n    throw new Error('INVALID_DOTENV_KEY: Missing environment part')\n  }\n\n  // Get ciphertext payload\n  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`\n  const ciphertext = result.parsed[environmentKey] // DOTENV_VAULT_PRODUCTION\n  if (!ciphertext) {\n    throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`)\n  }\n\n  return { ciphertext, key }\n}\n\nfunction _vaultPath (options) {\n  let dotenvPath = path.resolve(process.cwd(), '.env')\n\n  if (options && options.path && options.path.length > 0) {\n    dotenvPath = options.path\n  }\n\n  // Locate .env.vault\n  return dotenvPath.endsWith('.vault') ? dotenvPath : `${dotenvPath}.vault`\n}\n\nfunction _resolveHome (envPath) {\n  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath\n}\n\nfunction _configVault (options) {\n  _log('Loading env from encrypted .env.vault')\n\n  const parsed = DotenvModule._parseVault(options)\n\n  let processEnv = process.env\n  if (options && options.processEnv != null) {\n    processEnv = options.processEnv\n  }\n\n  DotenvModule.populate(processEnv, parsed, options)\n\n  return { parsed }\n}\n\nfunction configDotenv (options) {\n  let dotenvPath = path.resolve(process.cwd(), '.env')\n  let encoding = 'utf8'\n  const debug = Boolean(options && options.debug)\n\n  if (options) {\n    if (options.path != null) {\n      dotenvPath = _resolveHome(options.path)\n    }\n    if (options.encoding != null) {\n      encoding = options.encoding\n    }\n  }\n\n  try {\n    // Specifying an encoding returns a string instead of a buffer\n    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }))\n\n    let processEnv = process.env\n    if (options && options.processEnv != null) {\n      processEnv = options.processEnv\n    }\n\n    DotenvModule.populate(processEnv, parsed, options)\n\n    return { parsed }\n  } catch (e) {\n    if (debug) {\n      _debug(`Failed to load ${dotenvPath} ${e.message}`)\n    }\n\n    return { error: e }\n  }\n}\n\n// Populates process.env from .env file\nfunction config (options) {\n  const vaultPath = _vaultPath(options)\n\n  // fallback to original dotenv if DOTENV_KEY is not set\n  if (_dotenvKey(options).length === 0) {\n    return DotenvModule.configDotenv(options)\n  }\n\n  // dotenvKey exists but .env.vault file does not exist\n  if (!fs.existsSync(vaultPath)) {\n    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`)\n\n    return DotenvModule.configDotenv(options)\n  }\n\n  return DotenvModule._configVault(options)\n}\n\nfunction decrypt (encrypted, keyStr) {\n  const key = Buffer.from(keyStr.slice(-64), 'hex')\n  let ciphertext = Buffer.from(encrypted, 'base64')\n\n  const nonce = ciphertext.slice(0, 12)\n  const authTag = ciphertext.slice(-16)\n  ciphertext = ciphertext.slice(12, -16)\n\n  try {\n    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce)\n    aesgcm.setAuthTag(authTag)\n    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`\n  } catch (error) {\n    const isRange = error instanceof RangeError\n    const invalidKeyLength = error.message === 'Invalid key length'\n    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data'\n\n    if (isRange || invalidKeyLength) {\n      const msg = 'INVALID_DOTENV_KEY: It must be 64 characters long (or more)'\n      throw new Error(msg)\n    } else if (decryptionFailed) {\n      const msg = 'DECRYPTION_FAILED: Please check your DOTENV_KEY'\n      throw new Error(msg)\n    } else {\n      console.error('Error: ', error.code)\n      console.error('Error: ', error.message)\n      throw error\n    }\n  }\n}\n\n// Populate process.env with parsed values\nfunction populate (processEnv, parsed, options = {}) {\n  const debug = Boolean(options && options.debug)\n  const override = Boolean(options && options.override)\n\n  if (typeof parsed !== 'object') {\n    throw new Error('OBJECT_REQUIRED: Please check the processEnv argument being passed to populate')\n  }\n\n  // Set process.env\n  for (const key of Object.keys(parsed)) {\n    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {\n      if (override === true) {\n        processEnv[key] = parsed[key]\n      }\n\n      if (debug) {\n        if (override === true) {\n          _debug(`\"${key}\" is already defined and WAS overwritten`)\n        } else {\n          _debug(`\"${key}\" is already defined and was NOT overwritten`)\n        }\n      }\n    } else {\n      processEnv[key] = parsed[key]\n    }\n  }\n}\n\nconst DotenvModule = {\n  configDotenv,\n  _configVault,\n  _parseVault,\n  config,\n  decrypt,\n  parse,\n  populate\n}\n\nmodule.exports.configDotenv = DotenvModule.configDotenv\nmodule.exports._configVault = DotenvModule._configVault\nmodule.exports._parseVault = DotenvModule._parseVault\nmodule.exports.config = DotenvModule.config\nmodule.exports.decrypt = DotenvModule.decrypt\nmodule.exports.parse = DotenvModule.parse\nmodule.exports.populate = DotenvModule.populate\n\nmodule.exports = DotenvModule\n\n\n//# sourceURL=webpack://ofi-restapi/./node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "./routes/userRoutes.js":
/*!******************************!*\
  !*** ./routes/userRoutes.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nconst config = __webpack_require__(/*! ../config/config.js */ \"./config/config.js\");\r\n\r\n//======================= Controller ======================================================\r\n\r\nconst userControllers = __webpack_require__(/*! ../controllers/user.controllers.js */ \"./controllers/user.controllers.js\");\r\nconst postControllers = __webpack_require__(/*! ../controllers/post.controllers.js */ \"./controllers/post.controllers.js\");\r\n\r\nconst router = express.Router();\r\n\r\n//============ Singnup and login =============\r\n\r\nrouter.post(\"/Signup\", userControllers.register);\r\n\r\nrouter.post(\"/login\", userControllers.login);\r\n\r\nrouter.use(function (req, res, next) {\r\n  if (!req.headers[\"authorization\"])\r\n    return res.status(401).json({ message: \"user Unauthorized\" });\r\n  const authHeader = req.headers[\"authorization\"];\r\n  const secret = config.ACCESS_TOKEN_SECRET;\r\n  const bearerToken = authHeader.split(\" \");\r\n  const token = bearerToken[1];\r\n  jwt.verify(token, secret, function (err, payload) {\r\n    if (err) {\r\n      const message =\r\n        err.name === \"JsonWebTokenError\" ? \"Unauthorized\" : err.message;\r\n      return res.status(401).json({\r\n        message: message,\r\n      });\r\n    }\r\n    req.payload = payload;\r\n    res.locals.id = payload.id;\r\n    next();\r\n  });\r\n});\r\n\r\nrouter.post(\"/addPost\", postControllers.addPost);\r\nrouter.get(\"/getPost\", postControllers.getPost);\r\nrouter.put(\"/updatePost/:id\", postControllers.updatePost);\r\nrouter.delete(\"/deletePost/:id\", postControllers.deletePost);\r\n\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack://ofi-restapi/./routes/userRoutes.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst cors = __webpack_require__(/*! cors */ \"cors\");\r\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\n__webpack_require__(/*! dotenv/config */ \"./node_modules/dotenv/config.js\");\r\nconst UserRoutes = __webpack_require__(/*! ./routes/userRoutes.js */ \"./routes/userRoutes.js\");\r\n\r\nconst app = express();\r\n\r\nconst sequelize = __webpack_require__(/*! ./databaseConfig/db.js */ \"./databaseConfig/db.js\");\r\n// Creating all the tables defined in user\r\nsequelize.sync();\r\n\r\n//sequelize.sync({force:true})\r\n\r\napp.use(bodyParser.json({ limit: '200mb' }));\r\napp.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));\r\napp.use(express.json());\r\napp.use(cors());\r\n\r\nconst port = 5000;\r\n\r\napp.get('/test', (req, res, next) => {\r\n  res.json({\r\n    success: true,\r\n    message: 'Posted successfully ',\r\n  });\r\n});\r\n\r\napp.use('/api', UserRoutes);\r\n\r\napp.listen(port, () => {\r\n  console.log(`Example app listening at http://localhost:${port}`);\r\n});\r\n\n\n//# sourceURL=webpack://ofi-restapi/./server.js?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcryptjs");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("sequelize");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "./node_modules/dotenv/package.json":
/*!******************************************!*\
  !*** ./node_modules/dotenv/package.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('{\"name\":\"dotenv\",\"version\":\"16.3.1\",\"description\":\"Loads environment variables from .env file\",\"main\":\"lib/main.js\",\"types\":\"lib/main.d.ts\",\"exports\":{\".\":{\"types\":\"./lib/main.d.ts\",\"require\":\"./lib/main.js\",\"default\":\"./lib/main.js\"},\"./config\":\"./config.js\",\"./config.js\":\"./config.js\",\"./lib/env-options\":\"./lib/env-options.js\",\"./lib/env-options.js\":\"./lib/env-options.js\",\"./lib/cli-options\":\"./lib/cli-options.js\",\"./lib/cli-options.js\":\"./lib/cli-options.js\",\"./package.json\":\"./package.json\"},\"scripts\":{\"dts-check\":\"tsc --project tests/types/tsconfig.json\",\"lint\":\"standard\",\"lint-readme\":\"standard-markdown\",\"pretest\":\"npm run lint && npm run dts-check\",\"test\":\"tap tests/*.js --100 -Rspec\",\"prerelease\":\"npm test\",\"release\":\"standard-version\"},\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/motdotla/dotenv.git\"},\"funding\":\"https://github.com/motdotla/dotenv?sponsor=1\",\"keywords\":[\"dotenv\",\"env\",\".env\",\"environment\",\"variables\",\"config\",\"settings\"],\"readmeFilename\":\"README.md\",\"license\":\"BSD-2-Clause\",\"devDependencies\":{\"@definitelytyped/dtslint\":\"^0.0.133\",\"@types/node\":\"^18.11.3\",\"decache\":\"^4.6.1\",\"sinon\":\"^14.0.1\",\"standard\":\"^17.0.0\",\"standard-markdown\":\"^7.1.0\",\"standard-version\":\"^9.5.0\",\"tap\":\"^16.3.0\",\"tar\":\"^6.1.11\",\"typescript\":\"^4.8.4\"},\"engines\":{\"node\":\">=12\"},\"browser\":{\"fs\":false}}');\n\n//# sourceURL=webpack://ofi-restapi/./node_modules/dotenv/package.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server.js");
/******/ 	
/******/ })()
;