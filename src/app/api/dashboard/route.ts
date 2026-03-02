import React from 'react'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    return Response.json({ message: "Hello, world!" })

}
