import { registerAs } from "@nestjs/config";

export default registerAs('settings', () => ({
    port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
}));
