import React, { useRef, useState, useEffect, useCallback, ReactNode, MouseEventHandler } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductIconProps {
  name: string;
  className?: string;
}

const ProductIcon: React.FC<ProductIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const IconComp = (Icons as any)[name];
  if (IconComp) return <IconComp className={className} />;
  return <Icons.Shield className={className} />;
};

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.9, opacity: 0, y: 15 }}
      animate={inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: 15 }}
      transition={{ duration: 0.25, delay: delay * index, ease: "easeOut" }}
      className="mb-3 cursor-pointer outline-none"
    >
      {children}
    </motion.div>
  );
};

export interface AnimatedListProduct {
  slug: string;
  title: string;
  description: string;
  icon: string;
  screenshot: string;
}

interface AnimatedListProps {
  items: AnimatedListProduct[];
  onItemSelect?: (item: AnimatedListProduct, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = false,
  initialSelectedIndex = 0
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  const handleItemMouseEnter = useCallback((index: number) => {
    setSelectedIndex(index);
    if (onItemSelect && items[index]) {
      onItemSelect(items[index], index);
    }
  }, [items, onItemSelect]);

  const handleItemClick = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      if (onItemSelect && items[index]) {
        onItemSelect(items[index], index);
      }
    },
    [items, onItemSelect]
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 40, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 40, 1));
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => {
          const next = Math.min(prev + 1, items.length - 1);
          if (onItemSelect) onItemSelect(items[next], next);
          return next;
        });
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => {
          const next = Math.max(prev - 1, 0);
          if (onItemSelect) onItemSelect(items[next], next);
          return next;
        });
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          // Navigate to details page on enter key
          window.location.href = `/product/${items[selectedIndex].slug}`;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 30;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={listRef}
        className={`max-h-[520px] overflow-y-auto pr-2 py-4 ${
          displayScrollbar
            ? '[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-[#051124] [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-[4px]'
            : 'scrollbar-hide'
        }`}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: displayScrollbar ? 'thin' : 'none',
          scrollbarColor: 'rgba(255,255,255,0.1) #051124'
        }}
      >
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <AnimatedItem
              key={item.slug}
              delay={0.05}
              index={index}
              onMouseEnter={() => handleItemMouseEnter(index)}
              onClick={() => handleItemClick(index)}
            >
              <div 
                className={`relative p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 select-none ${
                  isSelected 
                    ? 'border-[#87DEC7] bg-[#0c1e3a]/80 shadow-[0_0_20px_rgba(135,222,199,0.15)] scale-[1.02]' 
                    : 'border-white/5 bg-[#071329]/60 hover:bg-[#0c1e3a]/40 hover:border-white/15'
                } ${itemClassName}`}
              >
                {/* Leading indicator circle / active glow */}
                <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  <ProductIcon name={item.icon} className={`w-4 h-4 transition-colors ${isSelected ? 'text-[#87DEC7]' : 'text-slate-400'}`} />
                </div>
                
                {/* Text Content */}
                <div className="flex-1 min-w-0 pr-6">
                  <h4 className={`text-sm font-bold tracking-tight transition-colors ${isSelected ? 'text-[#87DEC7]' : 'text-white'}`}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-1 truncate">
                    {item.description}
                  </p>
                  
                  {/* Action link visible on active state */}
                  {isSelected && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2.5"
                    >
                      <Link 
                        to={`/product/${item.slug}`} 
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-[#87DEC7] hover:text-[#5bcbb1] transition-colors"
                      >
                        Explore Module
                        <Icons.ArrowRight className="w-3 h-3" />
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Leading Pill accent */}
                {isSelected && (
                  <motion.div
                    layoutId="activeLeadingIndicator"
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#87DEC7] rounded-r-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </AnimatedItem>
          );
        })}
      </div>

      {showGradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[40px] bg-gradient-to-b from-[#051124] to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-[#051124] to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedList;
