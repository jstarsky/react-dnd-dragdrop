import React, {useState} from 'react';

import AppsIcon from '@material-ui/icons/Apps';
import {makeStyles} from '@material-ui/core/styles';
 import { AppBar,IconButton, Toolbar,Menu,Checkbox} from '@material-ui/core';
import A from './A';
import B from './B';
import C from './C';
import D from './D';
import F from './F';
import E from './E';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
const useStyles = makeStyles(() => ({
	root: {
		display: 'flex'
	},
	appBar: {
		width: `calc(100% - 0px)`,
		marginLeft: 0,
		height: 49,
		backgroundColor: 'green'
	},
	content: {
		flexGrow: 1,
		top: 49,
		position: 'relative',
		backgroundColor: '#FFFFFF'
	},
	
	FilterIcon: {
		position: 'absolute',
        right: 41,
        top:0,
		color: 'white'
	},
	
	
	drag: {
		padding: 10
	},
	
	
	
	checkbox:{
	width: 21, height: 21
	},
	checkboxContainer:{
		
			display: 'flex', paddingLeft: 8, fontSize: 12,paddingTop:18,paddingRight: 8
           
		  
	},
	checkboxSection:{
		overflowY: 'auto' 
	},
	
	CardSection: {
		display: 'flex',
		flexWrap: 'wrap',
		width: 'auto'
	},
	
	label:{
		 paddingTop:7, maxWidth: 222 ,fontSize:16
	},
	}));





function DragDrop(props) {
    const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
 

  const handleClose=(event)=>{		
    setAnchorEl(null)
}

	
	
	const handleOption=(e)=>{
		let newArr = initialState;
	 newArr.ColumnOrder.map((item,index)=>{
		 newArr.columns[item].cardIds.map((card,sequence)=>{
	 		console.log(newArr.cards[card].show)
			
			 if(newArr.cards[card].title===e.target.value){
				 newArr.cards[card].show=!newArr.cards[card].show
				}
				
			})
	 })
	 setinitialState(newArr)
	 console.log(initialState)
		
		let newArrList = [...CardList];
		newArrList.map(li=>{
			if(li.id == e.target.id){
				li.isChecked = !li.isChecked
			}
		})
		setList(newArrList)
		console.log(CardList)
		
		
 };
 


const handleMenu = event => {
    setAnchorEl(event.currentTarget);
};
	const [initialState, setinitialState] = useState({
		cards: {
			card1: {
				id: 'card1',
				title: 'A',
				content: <A  />,
				show:true
				
			},
			card2: {id: 'card2', title: 'B', content: <B />,show:true},
			card3: {id: 'card3', title: 'C', content: <C  />,show:true},
			card4: {
				id: 'card4',
				title: 'D',
				content: <D  />,
				show:true
			},
			card5: {id: 'card5', title: 'E', content: <E  />,show:true},
			card6: {id: 'card6', title: 'F', content: <F  />,show:true}
		},
		columns: {
			'column-1': {
				id: 'column-1',
				title: 'column1',
				cardIds: ['card1', 'card6']
			},
			'column-2': {
				id: 'column-2',
				title: 'column2',
				cardIds: ['card2', 'card4']
			},
			'column-3': {
				id: 'column-3',
				title: 'column3',
				cardIds: ['card3', 'card5']
			}
		},
		ColumnOrder: ['column-1', 'column-2', 'column-3']
	});
	const[CardList,setList]=useState([{name:'A',id:1,isChecked:initialState.cards['card1'].show},{name:'B',id:2,isChecked:initialState.cards['card6'].show},
	{name:'C',id:3,isChecked:initialState.cards['card3'].show},{name:'D',id:4,isChecked:initialState.cards['card5'].show},
	{name:'E',id:5,isChecked:initialState.cards['card4'].show},{name:'F',id:6,isChecked:initialState.cards['card2'].show}])
	
	const onDragEnd = result => {
		const {destination, source, draggableId, type} = result;
		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}
		

		const start = initialState.columns[source.droppableId];
		const finish = initialState.columns[destination.droppableId];

		if (start === finish) {
			const newCardIds = Array.from(start.cardIds);
			newCardIds.splice(source.index, 1);
			newCardIds.splice(destination.index, 0, draggableId);
			const newColumn = {
				...start,
				cardIds: newCardIds
			};
			const newState = {
				...initialState,
				columns: {
					...initialState.columns,
					[newColumn.id]: newColumn
				}
			};
			setinitialState(newState);
			return;
		}
		const startCardIds = Array.from(start.cardIds);
		startCardIds.splice(source.index, 1);

		const newStart = {
			...start,
			cardIds: startCardIds
		};
		const finishCardIds = Array.from(finish.cardIds);
		finishCardIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			cardIds: finishCardIds
		};
		const newState = {
			...initialState,
			columns: {
				...initialState.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		};
		setinitialState(newState);
	};

	return (
		<div className={classes.root}>
            <main className={classes.content}>
            <AppBar position='fixed' className={classes.appBar}>

            <Toolbar>
             <IconButton
			  className={classes.FilterIcon}
			  onClick={handleMenu}
               >
                 <AppsIcon/>
               </IconButton>
			   <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} style={{top:40.4688}}>
                 <form>
                  
                   
                  
                   <div className={classes.checkboxSection}>
				   
                     {CardList.map(item => (
                       
                       <div>
                         <div className={classes.checkboxContainer}
                         > 
                          
                           <Checkbox
                             className={classes.checkbox}
                             checked={item.isChecked}
                             onChange={handleOption}
                             value={item.name}

                             id={item.id}
                             name={item.name}
                             inputProps={{
                               'aria-label': 'secondary checkbox'
                             }}
                           />
                            <label className={classes.label}>{item.name}</label> 

                          </div> 
                       </div>))}
                     
                   </div>
                 </form>
               </Menu>
              


             </Toolbar>
           </AppBar>
			
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='all-colums' direction='horizontal' type='cards'>
						{provided => (
							<div {...provided.droppableProps} ref={provided.innerRef} className={classes.CardSection}>
								{initialState.ColumnOrder.map((item, index) => (
									<Draggable key={item} draggableId={item} index={index}>
										{(provided, snapshot) => (
											<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
												<Droppable droppableId={item}>
													{provided => (
														<div {...provided.droppableProps} ref={provided.innerRef}>
															{initialState.columns[item].cardIds.map((card, sequence) => (
																<Draggable draggableId={card} index={sequence} key={sequence}>
																	{(provided, snapshot) => (
																		<div
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																		>
																			{initialState.cards[card].show&&<div>{initialState.cards[card].content}</div>}
																		</div>
																	)}
																</Draggable>
															))}
															{provided.placeholder}
														</div>
													)}
												</Droppable>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				</main>
		</div>
	);
}

export default DragDrop;
