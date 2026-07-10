import { startDepositListener } from "@/lib/blockchain/listener";

export async function GET() {
  try {
    await startDepositListener();

    return Response.json({
      success: true,
      message: "Deposit listener started.",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Failed to start listener",
      },
      {
        status: 500,
      }
    );
  }
}