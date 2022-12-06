"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const index_1 = require("./graphql/index");
const index_2 = require("./database/index");
const mount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const httpServer = http_1.default.createServer(app);
    const server = new server_1.ApolloServer({ typeDefs: index_1.typeDefs, resolvers: index_1.resolvers, plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })] });
    const db = yield (0, index_2.connectDatabase)();
    server.start().then(() => {
        console.log('server started...');
        app.use('/api', (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
            context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () { return ({ token: req.headers.token, db }); })
        }));
        new Promise(resolve => (httpServer.listen({ port: process.env.PORT }, resolve))).then(() => {
            console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/api`);
        });
    });
});
mount((0, express_1.default)());
