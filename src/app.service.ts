import { Injectable } from "@nestjs/common"

import { getConnection } from "./db/open"

@Injectable()
export class AppService {
	getDB = getConnection
}
