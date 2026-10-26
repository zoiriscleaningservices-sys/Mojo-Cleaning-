import React, { useState } from 'react';
import {
  CLEANING_CHECKLIST,
  SERVICES,
  type ChecklistRoom,
  type ServiceItem,
} from '../config/business';
import { ArrowRightIcon, CheckCircleIcon, MojoSparkle } from './Icons';
import { ServiceCard } from './ServiceCard';

interface ServiceGridProps {
  onSelectService: (serviceId: ServiceItem['id']) => void;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ onSelectService }) => {
  const [activeRoom, setActiveRoom] = useState<ChecklistRoom['id']>('kitchen');
  const [checklistExpanded, setChecklistExpanded] = useState<boolean>(false);

  const currentRoom =
    CLEANING_CHECKLIST.find((r) => r.id === activeRoom) || CLEANING_CHECKLIST[0];
  const visibleTasks = checklistExpanded
    ? currentRoom.tasks
    : currentRoom.tasks.slice(0, 10);

  return (
    <section id="services" className="services-section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header-split">
          <div>
            <div className="section-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Tailored Residential Care</span>
            </div>
            <h2 id="services-heading" className="section-title">
              Your home, your kind of clean.
            </h2>
          </div>

          <p className="section-subtitle">
            From effortless weekly upkeep to intensive deep cleans, real estate transitions, and
            post-renovation dust relief—every visit follows our transparent Huntsville room-by-room
            standard and adapts to your household.
          </p>
        </div>

        {/* 4 Service Cards */}
        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelectService={onSelectService}
            />
          ))}
        </div>

        {/* Interactive 56-Point Room-by-Room Checklist Explorer */}
        <div id="checklist-explorer" className="checklist-explorer-card">
          <div className="checklist-header">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={13} />
                <span>Total Transparency • 56 Verified Tasks</span>
              </div>
              <h3 className="checklist-title">
                Room-by-Room Cleaning Checklist Comparison
              </h3>
              <p className="checklist-subtitle">
                See what is included across Standard (Recurring), Deep, and Move-In / Move-Out
                cleans. Want to skip a guest bedroom or add inside-oven care to a routine visit?
                Every checklist is 100% customizable.
              </p>
            </div>

            <div className="checklist-room-tabs" role="tablist" aria-label="Select room checklist">
              {CLEANING_CHECKLIST.map((room) => {
                const isSelected = room.id === activeRoom;
                return (
                  <button
                    key={room.id}
                    type="button"
                    role="tab"
                    id={`tab-${room.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${room.id}`}
                    className={`checklist-tab-btn ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setActiveRoom(room.id)}
                  >
                    <span>{room.name}</span>
                    <span className="checklist-tab-count">{room.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id={`panel-${currentRoom.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentRoom.id}`}
            className="checklist-table-wrapper"
          >
            <div className="checklist-room-summary-bar">
              <div>
                <strong>{currentRoom.name} Standard</strong> — {currentRoom.summary}
              </div>
              <span className="checklist-custom-badge">100% Flexible Upon Request</span>
            </div>

            <div className="checklist-scroll-container">
              <table className="checklist-table">
                <thead>
                  <tr>
                    <th scope="col" className="col-task">
                      {currentRoom.name} Task ({currentRoom.count} items)
                    </th>
                    <th scope="col" className="col-tier">
                      <span className="tier-label-mobile">Standard</span>
                      <span className="tier-label-desktop">Standard / Recurring</span>
                    </th>
                    <th scope="col" className="col-tier is-highlighted">
                      <span className="tier-label-mobile">Deep</span>
                      <span className="tier-label-desktop">Deep Clean</span>
                    </th>
                    <th scope="col" className="col-tier">
                      <span className="tier-label-mobile">Move</span>
                      <span className="tier-label-desktop">Move-In / Out</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTasks.map((item) => (
                    <tr key={item.task}>
                      <th scope="row" className="cell-task">
                        <span>{item.task}</span>
                        {item.addOnNote ? (
                          <span className="task-addon-pill">★ {item.addOnNote}</span>
                        ) : null}
                      </th>
                      <td className="cell-tier">
                        {item.standard ? (
                          <span className="tier-included" aria-label="Included in Standard Clean">
                            <CheckCircleIcon size={16} />
                            <span className="sr-only">Included</span>
                          </span>
                        ) : (
                          <span className="tier-optional" aria-label="Not in standard clean">
                            —
                          </span>
                        )}
                      </td>
                      <td className="cell-tier is-highlighted">
                        {item.deep ? (
                          <span className="tier-included" aria-label="Included in Deep Clean">
                            <CheckCircleIcon size={16} />
                            <span className="sr-only">Included</span>
                          </span>
                        ) : (
                          <span className="tier-optional" aria-label="Available as add-on">
                            Add-on
                          </span>
                        )}
                      </td>
                      <td className="cell-tier">
                        {item.moveInOut ? (
                          <span className="tier-included" aria-label="Included in Move-In/Out Clean">
                            <CheckCircleIcon size={16} />
                            <span className="sr-only">Included</span>
                          </span>
                        ) : (
                          <span className="tier-optional">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="checklist-footer-bar">
              {currentRoom.tasks.length > 10 ? (
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => setChecklistExpanded((prev) => !prev)}
                  aria-expanded={checklistExpanded}
                >
                  {checklistExpanded
                    ? `Show Fewer ${currentRoom.name} Tasks`
                    : `View All ${currentRoom.tasks.length} ${currentRoom.name} Tasks`}
                </button>
              ) : <div />}

              <a
                href="#quote"
                className="checklist-custom-cta"
                onClick={() => onSelectService('deep')}
              >
                <span>Need a custom room checklist? Request a tailored quote</span>
                <ArrowRightIcon size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
