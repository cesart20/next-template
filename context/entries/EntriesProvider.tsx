import { FC, ReactNode, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

interface Props {
    children?: ReactNode;
  
}


export const EntriesProvider:FC<Props> = ({ children }) => {

    const { enqueueSnackbar } = useSnackbar();

    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );

    const addNewEntry = async( description: string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: 'Entry - Add-Entry', payload: data });

    }

    const updateEntry = async( { _id, description, status }: Entry, showSnackbar: false ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
            dispatch({ type: 'Entry - Update-Entry', payload: data });

            if (showSnackbar) {
                enqueueSnackbar('Entrada Actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                })
            }
            

        } catch (error) {
            console.log({ error });
        }
    }

    const deleteEntry = async( { _id }: Entry ) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${ _id }`);
            dispatch({ type: 'Entry - Delete-Entry', payload: data });
        } catch (error) {
            console.log({ error });
        }
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: 'Entry - Refresh-Data', payload: data });
    }

    useEffect(() => {
      refreshEntries();
    }, []);
    


    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};