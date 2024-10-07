import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { clientId, clientSecret, ...formValues } = await req.json();
    console.log("formValues", clientId, clientSecret, formValues);
    const response = await axios.post(`https://dev-api.paybolt.in/api/v1/docs/payin`, formValues, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Replace with your actual clientId and clientSecret
      },
    });

    if (!response.status) {
      const errorText = await response.data;
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const { clientId, clientSecret, orderId } = await req.json();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/docs/payin/status`, { orderId }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Replace with your actual clientId and clientSecret
      },
    });

    const data = await response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
};