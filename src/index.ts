import { config } from 'dotenv';
import Server from './models/server';

config();
const server = new Server();
server.listen();
