import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import initDB from "./db/schema"

async function bootstrap() {
	await initDB()

	const app = await NestFactory.create(AppModule)
	app.enableCors()
	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
