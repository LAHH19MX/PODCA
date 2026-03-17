import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { correo, mensaje, nombre } = await request.json();

    if (!correo || correo === "SIN REGISTRO") {
      return NextResponse.json(
        { success: false, error: "El docente no cuenta con email registrado" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: correo,
      subject: "Mensaje desde el sistema de Cuerpos Académicos UTHH",
      text: mensaje,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
