import clsx from "clsx";
import type { ReactElement } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Th,
	Box,
	Select
} from '@chakra-ui/react';

interface Props {
	label: string;
	filterOptions: string[];
	defaultValue: string;
	onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

export default function PopOverHeader(props: Props) {
	return (
		<Th className='hover:bg-yellow-100'>
			<Popover>
				<PopoverTrigger>
					<Box tabIndex={0} role='button'>
						{props.label}
					</Box>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader>Admin Options</PopoverHeader>
					<PopoverBody>
						<div className='mb-2'>Filter:</div>
						<Select size="sm" defaultValue={props.defaultValue} onChange={props.onChange}>
							{props.filterOptions.map(
								x => <option value={x}>{x}</option>
							)}
						</Select>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Th>
	);
}