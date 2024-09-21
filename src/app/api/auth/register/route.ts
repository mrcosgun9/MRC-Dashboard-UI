import AuthService from '@/services/actions/auth';
import TenantService from '@/services/actions/tenants';
import { ResponseStatus } from '@/types/baseType';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const reqData = await request.json();
    const resRegister = await AuthService.register(reqData);
    console.log(resRegister);
    
    if (resRegister.status == ResponseStatus.Ok) {
      const resTenant = await TenantService.upsertTenant(
        {
          domain: reqData.subDomain as string,
          id: 0,
          slug: reqData.subDomain as string,
          title: "",
          accessToken: resRegister.data.accessToken
        }
      )
      if (resTenant.status!==ResponseStatus.Ok) {
        
      }
    }
    else {
      return NextResponse.json(resRegister, { status: 200 })
    }

    return NextResponse.json({
      data: reqData
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', message: error }, { status: 500 })
  }

}