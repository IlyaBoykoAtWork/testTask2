import { Controller, Patch } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Patch("problems")
	async patchProblems(): Promise<number> {
		const db = await this.appService.getDB()
		const { changes } = await db.run(
			"UPDATE user SET problems = FALSE WHERE problems = TRUE",
		)
		return changes ?? 0
	}
}
