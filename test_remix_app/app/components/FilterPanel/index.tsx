import { cn } from '~/utils';
import { categories, roles } from '~/constants';
import { tProps } from './_types';

/**
 * @description the component half of the search filter container. use together
 *
*/
export const FilterPanel = (props: tProps) => (
  <div
    className={cn('flex flex-col d:flex-row', {
      [props.className ?? ""]: !!props.className,
      'mb-2 d:mb-3': !props.className,
    })}>
    {props.filterOptions && (
      <select
        className="w-full d:w-3/12 mb-1 d:mb-0 d:mr-2"
        onBlur={props.onFilterOptionChange}
        onChange={props.onFilterOptionChange}>
        {props.filterOptions.map(opt => (
          <option key={opt.key} value={opt.key}>
            {opt.display}
          </option>
        ))}
      </select>
    )}
    {props.onCategoryChange && (
      <select
        className="w-full d:w-3/12 mb-1 d:mb-0 d:mr-2"
        onBlur={props.onCategoryChange}
        onChange={props.onCategoryChange}>
        <option value="">
          Show all
        </option>
        {categories.map(({ display }) => (
          <option key={display} value={display}>
            {display}
          </option>
        ))}
      </select>
    )}
    {/*
      @TODO this is misleadingly named -> should be past/future filter
      published should mean isDraft or not
    */}
    {props.onPublishedFilterChange && (
      <select
        className="w-full d:w-3/12 mb-1 d:mb-0 d:mr-2"
        defaultValue={props.publishedFilter}
        onBlur={props.onPublishedFilterChange}
        onChange={props.onPublishedFilterChange}>
        <option value="upcoming">
          Filter meetings
        </option>
        {[
          { display: 'Show all', value: 'n/a' },
          { display: 'Upcoming', value: 'upcoming' },
          { display: 'Past', value: 'past' },
        ].map(({ display, value }) => (
          <option key={display} value={value}>
            {display}
          </option>
        ))}
      </select>
    )}
    {props.onRoleFilterChange && (
      <select
        className="w-full d:w-3/12 mb-1 d:mb-0 d:mr-2"
        onBlur={props.onRoleFilterChange}
        onChange={props.onRoleFilterChange}>
        {['n/a', ...roles].map(role => {
          let display = 'Show all';
          if (role === 'member') {
            display = props.memberName!;
          } else if (role === 'facilitator') {
            display = props.modName!;
          }

          return (
            <option
              key={role}
              value={role}>
              {display}
            </option>
          );
        })}
      </select>
    )}
    <label
      className="w-full"
      htmlFor="searchFilter">
      <input
        spellCheck
        type="search"
        id={props.id || 'searchFilter'}
        className="w-full"
        onChange={props.onSearchChange}
        placeholder={props.placeholder || 'Filter all results'}
      />
    </label>
  </div>
);
