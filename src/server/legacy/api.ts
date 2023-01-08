/**
 * Module for interacting with the legacy TCP API of VNDB.org.
 * API documentation: https://api.vndb.org/nyan.
 */

import net from 'net';

const apiConfig = {
  host: 'api.vndb.org',
  tcpPort: 19534,
  protocol: 1,
  client: {
    name: 'vndbre',
    version: 0.1,
  },
};

/** The End of Line character. */
const eol = '\x04';

/**
 * Sends a message via a TCP socket.
 * @param client Socket.
 * @param message Message to send.
 */
async function sendMessage(client: net.Socket, message: string): Promise<string> {
  client.write(message);
  let response: string | null = null;

  await (new Promise((resolve, _reject) => {
    client.on('data', data => {
      response = Buffer.from(data)
        .toString()
        .replace(eol, '');

      resolve(undefined);
    });
  }));

  if (response == null) {
    throw new Error('null response');
  }

  return response;
}

/**
 * Connects to the VNDB.org TCP server.
 * @param command API command to send to the server after connection.
 *
 * The connection is automatically destroyed after receiving a response from the server.
 */
export async function connect(command: string): Promise<string> {
  const client = new net.Socket();
  let response = '';

  await (new Promise((resolve, _reject) => {
    client.connect(apiConfig.tcpPort, apiConfig.host, async() => {
      const data = await sendMessage(client, command);
      response = data;
      client.destroy();

      resolve(undefined);
    });
  }));

  return response;
}

export const commandFactory = {
  /**
   * Login command builder.
   * @param username Username.
   * @param password Password.
   */
  login: (username: string, password: string) => `login {"protocol":${apiConfig.protocol},"client":"${apiConfig.client.name}","clientver":${apiConfig.client.version},"username":"${username}","password":"${password}", "createsession": "true"}${eol}`,
};
