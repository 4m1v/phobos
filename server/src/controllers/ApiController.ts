import { BodyParam, Delete, Post, JsonController } from "routing-controllers";
import { Inject } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import { Image, Session } from "../../../src/api";

@JsonController("/api")
class AnnouncementController {
  //@Inject()
  //private readonly announcementService: AnnouncementService;

  @Post("/start")
  @OpenAPI({
    summary: "",
    description: "Output of ``",
  })
  public start(
    @BodyParam("fearMin", { required: true }) fearMin: number,
    @BodyParam("fearMax", { required: true }) FearMax: number
  ): Promise<{ sessionId: string }> {
    return null;
  }

  @Post("/image")
  @OpenAPI({
    summary: "",
    description: "Output of ``",
  })
  public image(
    @BodyParam("sessionId", { required: true }) sessionId: number
  ): Promise<{ image: Image }> {
    return null;
  }

  @Post("/feedback")
  @OpenAPI({
    summary: "",
    description: "Output of ``",
  })
  public feedback(
    @BodyParam("sessionId", { required: true }) sessionId: number,
    @BodyParam("imageId", { required: true }) imageId: number,
    @BodyParam("scariness", { required: true }) scariness: number
  ): Promise<Record<string, never>> {
    return null;
  }

  @Post("/feedback")
  @OpenAPI({
    summary: "",
    description: "Output of ``",
  })
  public result(
    @BodyParam("sessionId", { required: true }) sessionId: number
  ): Promise<{ session: Session }> {
    return null;
  }
}

export default AnnouncementController;
