import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';


export async function getServerSideProps(context) {
    nookies.destroy(context);

    return{
        redirect:{
            destination: '/login',
            permanent: false,
        }
    }
  }