import {useState, useMemo, useContext, ChangeEvent, FC} from 'react';
import { GetServerSideProps } from 'next'
import { Layout } from "@/components/layouts";
import {capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Entry, EntryStatus } from "@/interfaces";
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
}

export const EntryPage:FC<Props> = ({entry}) => {

    const {updateEntry, deleteEntry} = useContext(EntriesContext)
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {        
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
        if(inputValue.trim().length === 0) return;
        setTouched(true);
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue,
        }
        updateEntry(updatedEntry, true);
    }

    const deleteCard = () => {
        const deletedEntry: Entry = {
            ...entry,
        }
        const shouldDelete = confirm('¿Estás seguro que deseas eliminar esta entrada?');
        if(shouldDelete) {
            deleteEntry(deletedEntry);
        }
    }


  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
        <Grid container justifyContent='center' sx={{marginTop: 2}}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardHeader
                        title={`Entrada:`}
                        subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                    />
                    <CardContent>
                        <TextField
                            sx={{marginTop: 2, marginBottom: 1}}
                            fullWidth
                            placeholder="Nueva Entrada"
                            multiline
                            label="Nueva Entrada"
                            value={inputValue}
                            onChange={onInputValueChange}
                            helperText={isNotValid && 'Ingrese un valor'}
                            onBlur={() => setTouched(true)}
                            error={isNotValid}
                        />
                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup row value={status} onChange={onStatusChange}>
                                {
                                    validStatus.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                        
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant="contained"
                            fullWidth
                            onClick={onSave}
                            disabled={inputValue.length <= 0}
                        >
                            Guardar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <IconButton sx={{position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark'}}>
            < DeleteOutlineOutlinedIcon onClick={deleteCard} />
        </IconButton>

    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const {id} = ctx.params as {id: string};

    const entry = await dbEntries.getEntryById(id)

    
    if ( !entry ) {
      return {
        redirect: {
            destination: '/',
            permanent: false,
        }
      }  
    }

    return {
        props: {
            entry
        }
    }
}



export default EntryPage;