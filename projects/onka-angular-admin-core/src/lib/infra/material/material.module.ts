import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { StaticService } from '../../business/services/static-service';

import { MatNativeDateModule,				  } from '@angular/material/core'; // Core
import { MatFormFieldModule,			    } from '@angular/material/form-field'; // Form
import { MatCheckboxModule,				    } from '@angular/material/checkbox';
import { MatInputModule,				      } from '@angular/material/input';
import { MatRadioModule,				      } from '@angular/material/radio';
import { MatSelectModule,				      } from '@angular/material/select';
import { MatDatepickerModule, 			  } from '@angular/material/datepicker';
import { MatSliderModule,				      } from '@angular/material/slider';
import { MatSlideToggleModule,				} from '@angular/material/slide-toggle';
import { MatAutocompleteModule,				} from '@angular/material/autocomplete';
import { MatToolbarModule,				    } from '@angular/material/toolbar'; // Navigation
import { MatSidenavModule,				    } from '@angular/material/sidenav';
import { MatMenuModule,				        } from '@angular/material/menu';
import { MatListModule,				        } from '@angular/material/list'; // Layout
import { MatCardModule,				        } from '@angular/material/card';
import { MatDividerModule,  			    } from '@angular/material/divider';
import { MatExpansionModule,			  	} from '@angular/material/expansion';
import { MatGridListModule,				    } from '@angular/material/grid-list';
import { MatStepperModule,				    } from '@angular/material/stepper';
import { MatTabsModule,			          } from '@angular/material/tabs';
import { MatTreeModule,			          } from '@angular/material/tree';
import { MatButtonModule,				      } from '@angular/material/button'; // Button
import { MatButtonToggleModule,				} from '@angular/material/button-toggle';
import { MatBadgeModule,			        } from '@angular/material/badge';
import { MatChipsModule,			        } from '@angular/material/chips';
import { MatIconModule,				        } from '@angular/material/icon';
import { MatProgressSpinnerModule,		} from '@angular/material/progress-spinner';
import { MatProgressBarModule,				} from '@angular/material/progress-bar';
import { MatDialogModule,				      } from '@angular/material/dialog'; // Popups
import { MatTooltipModule,				    } from '@angular/material/tooltip';
import { MatSnackBarModule            } from '@angular/material/snack-bar';
import { MatPaginatorModule,			    } from '@angular/material/paginator'; // Data Table
import { MatSortModule,				        } from '@angular/material/sort';
import { MatTableModule,			        } from '@angular/material/table';


const modules = [
    MatNativeDateModule,				
    MatFormFieldModule,			    
    MatCheckboxModule,				    
    MatInputModule,				    
    MatRadioModule,				    
    MatSelectModule,				    
    MatDatepickerModule,				
    MatSliderModule,				    
    MatSlideToggleModule,				
    MatAutocompleteModule,				
    MatToolbarModule,				    
    MatSidenavModule,				    
    MatMenuModule,				        
    MatListModule,				        
    MatCardModule,				        
    MatDividerModule,  			    
    MatExpansionModule,				
    MatGridListModule,				    
    MatStepperModule,				    
    MatTabsModule,			            
    MatTreeModule,			            
    MatButtonModule,				    
    MatButtonToggleModule,				
    MatBadgeModule,			        
    MatChipsModule,			        
    MatIconModule,				        
    MatProgressSpinnerModule,			
    MatProgressBarModule,				
    MatDialogModule,				    
    MatTooltipModule,				    
    MatPaginatorModule,			    
    MatSortModule,				        
    MatTableModule,			   
    MatSnackBarModule     		        
];

/**
 * Material module 
 */
@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: new StaticService().getCurrentLang() },
  ],
})
export class MaterialModule {}