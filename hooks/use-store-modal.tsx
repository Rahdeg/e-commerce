import { create } from "zustand";

interface UseStoreInterface{
    isOpen: boolean,
    onOpen: ()=>void,
    onClose: ()=>void,

}

export const useStoreModal = create <UseStoreInterface>((set)=>({
    isOpen: false,
onOpen:()=>set({isOpen: true}),
onClose: ()=> set({ isOpen: false})
}))