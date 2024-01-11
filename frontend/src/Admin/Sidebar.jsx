
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Label from '@mui/icons-material/Label';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { AccessAlarm, AddIcCallOutlined, Dashboard, Laptop, PostAdd, Wc } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import "./Sidebar.css"

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.action.hover,
    [`& .${treeItemClasses.content}`]: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '&.Mui-expanded': {
        fontWeight: theme.typography.fontWeightRegular,
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
         backgroundColor: 'transparent', // Set background to transparent when selected
        // color: 'var(--tree-view-color)',
      },
      [`& .${treeItemClasses.label}`]: {
        fontWeight: 'inherit',
        color: 'inherit',
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 0,
      [`& .${treeItemClasses.content}`]: {
        paddingLeft: theme.spacing(2),
      },
    },
  }));

const StyledTreeItem = React.forwardRef(function StyledTreeItem(props, ref) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const styleProps = {
    // '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    // '--tree-view-bg-color':
    //   theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            pr: 0,
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={styleProps}
      {...other}
      ref={ref}
    />
  );
});

export const Sidebar =()=> {
  return (
   <>
   <div className='sidebar'>
    <TreeView
      aria-label="dashoard"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <StyledTreeItem nodeId="1" labelText="Dashboard" labelIcon={Dashboard} />

      <StyledTreeItem nodeId="2" labelText="Categories" labelIcon={Label}>
      <Link to="/admin/allproduct">
      <StyledTreeItem
          nodeId="3"
          labelText="All"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
          colorForDarkMode="#CCE8CD"
          bgColorForDarkMode="#0C130D"
        />
   </Link>
        {/* 
        <StyledTreeItem
          nodeId="4"
          labelText="Laptop"
          labelIcon={Laptop}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
          colorForDarkMode="#B8E7FB"
          bgColorForDarkMode="#071318"
        />
        <StyledTreeItem
          nodeId="5"
          labelText="Clothes"
          labelIcon={Wc}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
          colorForDarkMode="#FFE2B7"
          bgColorForDarkMode="#191207"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Watch"
          labelIcon={AccessAlarm}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
          colorForDarkMode="#D9B8FB"
          bgColorForDarkMode="#100719"
        /> */}
        <Link to="/admin/create">
         <StyledTreeItem
          nodeId="7"
          labelText="Create"
          labelIcon={AddIcCallOutlined}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
          colorForDarkMode="#B8E7FB"
          bgColorForDarkMode="#071318"
        />
        </Link>
      </StyledTreeItem>
      <Link to="/users">
      <StyledTreeItem nodeId="8" labelText="Users" labelIcon={Label}/>
      </Link>
      <Link to="/allorder">
      <StyledTreeItem nodeId="9" labelText="Orders" labelIcon={Label}/>
      </Link>
      <Link to="/usrs">
      <StyledTreeItem nodeId="10" labelText="Reviews" labelIcon={Label}/>
      </Link>
    </TreeView>
    </div>
    </>
  );
}