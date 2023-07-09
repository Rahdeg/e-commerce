"use client"
import AlertModal from "@/components/modals/alert-modal";
import { StoreModal } from "@/components/modals/store-modal";

import { useEffect, useState } from "react"

import React from 'react'

export const ModalProvider = () => {
    const [isMounted, setIsMounted]= useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
        <StoreModal/>
        </>
    )
}