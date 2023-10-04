import { IServerLessProvider } from '../../interfaces';
import { Knex } from 'knex';
import path from 'path';
import { app } from 'electron';

export class BetterSqliteProvider implements IServerLessProvider {
	private static _instance: IServerLessProvider;
	private readonly _connection: Knex;

	private constructor() {
		this._connection = require('knex')(this.config);
		console.log('[provider]: ', 'Better SQLite connected...');
	}

	public static get instance(): IServerLessProvider {
		if (!this._instance) {
			this._instance = new BetterSqliteProvider();
		}
		return this._instance;
	}

	public get connection(): Knex {
		return this._connection;
	}

	public get config(): Knex.Config {
		return {
			client: 'better-sqlite3',
			connection: {
				filename: path.resolve(
					app?.getPath('userData') || __dirname,
					'gauzy.better-sqlite3'
				),
				timezone: 'utc',
			},
			migrations: {
				directory: __dirname + '/migrations',
			},
			useNullAsDefault: true,
			debug: false,
			asyncStackTraces: true,
		};
	}
}
