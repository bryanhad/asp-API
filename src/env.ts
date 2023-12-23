import { cleanEnv, port, str } from 'envalid'

const env = cleanEnv(process.env, {
    PORT: port(),
    MONGODB_ATLAS_STRING: str(),
    NODE_ENV: str(),
    WEBSITE_URL: str(),
})

export default env